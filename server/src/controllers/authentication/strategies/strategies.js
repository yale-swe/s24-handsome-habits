import YaleCASStrategy from "./yale-cas.js";
export default function(passport) {
    passport.use('yalecas', YaleCASStrategy);

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}