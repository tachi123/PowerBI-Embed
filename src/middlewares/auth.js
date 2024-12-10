import express from 'express';

export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next(); //Permitir el acceso si hay sesión
    } else {
        res.redirect('/login'); //Redirigo al login si no hay sesión
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/current'); //Redirige al perfil si ya estoy logueado
    } else {
        next(); //Permitir el acceso si no hay sesión
    }
}