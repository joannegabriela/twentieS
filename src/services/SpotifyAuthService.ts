import SpotifyWebApi from 'spotify-web-api-node';

require('dotenv').config()


export class SpotifyAuthService {

    private clientID: string = process.env.SPOTIFY_CLIENT_ID;
    private clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET;
    private clientRedirectUrl: string = process.env.SPOTIFY_REDIRECT_URL;

    private stateKey = 'spotify_auth_state';

    private spotifyApi: SpotifyWebApi = new SpotifyWebApi({
        clientId: this.clientID,
        clientSecret: this.clientSecret,
        redirectUri: this.clientRedirectUrl
    });

    public getSpotifyApi() {
        return this.spotifyApi;
    }

    public getStateKey() {
        return this.stateKey;
    }

}
