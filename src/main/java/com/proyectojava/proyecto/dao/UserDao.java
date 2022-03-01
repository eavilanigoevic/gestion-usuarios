package com.proyectojava.proyecto.dao;

import com.proyectojava.proyecto.models.Usuario;


import java.util.List;


public interface UserDao {
    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registrarUsuario(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
