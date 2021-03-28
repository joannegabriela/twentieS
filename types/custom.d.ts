import express = require('express');

declare module 'express-session' {
    export interface Session {
        user_data: {
            user: SpotifyApi.CurrentUsersProfileResponse,
            topTracks: SpotifyApi.TrackObjectSimplified[];
            topArtists: SpotifyApi.ArtistObjectFull[];
            recommendations_tracks: SpotifyApi.TrackObjectFull[];
            artists_tracks: SpotifyApi.ArtistObjectSimplified.name[]
        };
    }
}
