const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.code === "23505") {
        return res.status(409).json({ error: "El email ya está registrado" });
    }

    if (err.code === "23503") {
        return res.status(400).json({ error: "El author_id no existe" });
    }

    res.status(500).json({ error: "Error interno del servidor" });
};

module.exports = errorHandler;
