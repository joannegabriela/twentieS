import { Request, Response } from 'express';
import { SpotifyAuthService } from '../services/SpotifyAuthService';
import { Utils } from '../utils/Utils';

require('dotenv').config()

const spotify = new SpotifyAuthService();

const scopes = [
  'user-top-read',
  'user-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-read',
  'user-follow-modify'
]

function loginSpotify(req: Request, res: Response) {
  const state: string = Utils.generateRandomString(16);

  res.cookie(spotify.getStateKey(), state);
  res.redirect(spotify.getSpotifyApi().createAuthorizeURL(scopes, state));
};


async function callback(req: Request, res: Response) {
  const error = req.query.error;
  const code = req.query.code.toString();

  if (error) {
    console.log("Callback error: ", error);
    return;
  }

  var authorization = await spotify.getSpotifyApi().authorizationCodeGrant(code);
  const access_token = authorization.body['access_token'];
  const refresh_token = authorization.body['refresh_token'];

  spotify.getSpotifyApi().setAccessToken(access_token);
  spotify.getSpotifyApi().setRefreshToken(refresh_token);

  const user = (await (spotify.getSpotifyApi().getMe())).body;

  const topTracks = await spotify.getSpotifyApi().getMyTopTracks({
    limit: 5
  });

  const topArtists = await spotify.getSpotifyApi().getMyTopArtists({
    limit: 5
  });

  var tracksID = [];
  var related_artists = [];

  topTracks.body.items.forEach((played) => {
    tracksID.push(played.id);
  })
  
  topArtists.body.items.forEach(async (artist) => {
    const related = (await spotify.getSpotifyApi().getArtistRelatedArtists(`${artist.id}`)).body.artists;
    related_artists.push(related[Math.floor(Math.random() * related.length)].id)
  })

  const spotify_recommendations_tracks = await spotify.getSpotifyApi().getRecommendations({
    limit: 20,
    seed_tracks: tracksID,
  });

  const recommended_tracksID = []

  spotify_recommendations_tracks.body.tracks.forEach((recommended_track) => {
    recommended_tracksID.push(recommended_track.id);
  })

  const user_data = {
    user: user,
    topTracks: topTracks.body.items,
    topArtists: topArtists.body.items,
    recommendations_tracks: recommended_tracksID,
    artists_tracks: related_artists
  }

  req.session.user_data = user_data;

  res.redirect('/twenties');

}

async function addPlaylist(req: Request, res: Response) {

  const tracks = req.session.user_data.recommendations_tracks;

  const tracksID: string[] = tracks.map(track => `spotify:track:${String(track)}`)

  const playlist = await spotify.getSpotifyApi().createPlaylist(`${req.session.user_data.user.display_name} twentieS`, {
    description: "a playlist of twenty songs based on you five top tracks"
  });

  await spotify.getSpotifyApi().addTracksToPlaylist(playlist.body.id, tracksID);

  res.redirect('/flash-sucess');
}

export { loginSpotify, callback, addPlaylist }