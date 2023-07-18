import paths from "../constants/routePaths";
import Home from "../screens/Home";
import MovieInfo from "../screens/Movies/pages/Info";

export const MAIN_ROUTES = [
    {
        path: paths.HOME,
        element: Home,
    },
    {
        path: paths.MOVIE_INFO,
        element: MovieInfo,
    },
];
