package com.proyectojava.proyecto.controllers;

import com.proyectojava.proyecto.dao.UserDao;
import com.proyectojava.proyecto.models.Usuario;
import com.proyectojava.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value="api/login",method= RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {
        Usuario usuarioLogueado = userDao.obtenerUsuarioPorCredenciales(usuario);
        if(usuarioLogueado != null ){
            String tokenJwt = jwtUtil.create(String.valueOf(usuario.getId()),usuario.getEmail());
            return tokenJwt;
        }
    return "FAIL";
    }
}
