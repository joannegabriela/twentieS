import { Router } from 'express';
import { Request, Response } from 'express';
var flash = require('connect-flash');

var spotifyController = require('../controllers/SpotifyController');

const router = Router();
router.use(flash());

router.all('/flash-sucess', (req: Request, res: Response) => {
    req.flash('success', "Success message");
    res.redirect('/twenties');
})

router.get("/", (req: Request, res: Response) => {
    res.render('home');
});

router.get('/login', spotifyController.loginSpotify);

router.get('/callback', spotifyController.callback);

router.get('/twenties', (req: Request, res: Response) => {
    const user_data = req.session.user_data;
    res.render('result', {
        data: user_data,
        expressFlash: req.flash('success') 
    });
});

router.get('/save-playlist', spotifyController.addPlaylist);

export { router }
