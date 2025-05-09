import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './EspecieModal.css';

const EspecieModal = ({ closeModal, especie, area }) => {
  const [comments, setComments] = useState([]); // Comentarios de la especie
  const [especieRating, setEspecieRating] = useState(0); // Calificación de la especie
  const [newComment, setNewComment] = useState(""); // Comentario del usuario
  const user = useSelector((state) => state.user);

  // Obtener comentarios al montar el modal
  useEffect(() => {
    fetchComments();
  }, [especie]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/comment/byEntityId?secret=TallerReact2025!&userId=123&speciesId=${especie.id}&page=1&pageSize=10`
      );
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      alert("Hubo un error al obtener los comentarios. Por favor, intenta más tarde.");
    }
  };

  const addEspecieRating = async () => {
    if (especieRating < 1 || especieRating > 5) {
      alert("La calificación debe estar entre 1 y 5.");
      return;
    }

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/comment/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: {
              userId: user?.id,
              naturalAreaId: area.id,
              speciesId: especie.id, // Asocias la calificación a la especie
              text: "Calificación de la especie",  // Texto fijo de calificación
              rating: Number(especieRating),   // La calificación de la especie
            },
          }),
        }
      );

      if (response.ok) {
        alert("Calificación agregada exitosamente.");
        fetchComments();  // Refrescar comentarios después de agregar la calificación
      } else {
        console.error("Error al agregar la calificación.");
      }
    } catch (error) {
      console.error("Error al agregar la calificación:", error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/comment/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: {
              userId: user?.id,
              naturalAreaId: area.id,
              speciesId: especie.id,  // Asociamos el comentario a la especie
              text: newComment,  // El comentario ingresado por el usuario
              rating: null,  // No es necesario incluir calificación aquí
            },
          }),
        }
      );

      if (response.ok) {
        alert("Comentario agregado exitosamente.");
        setNewComment("");  // Limpiar el campo de comentario después de agregar
        fetchComments();  // Refrescar los comentarios
      } else {
        console.error("Error al agregar el comentario.");
      }
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };

  return (
    <div className='register-container'>
      <div className='form-register'>
        <button className='modal-close' onClick={closeModal}>✖</button>

        <div className="form-group">
          <p>Nombre: {especie.commonName}</p>
          <p>Nombre Cientifico: {especie.scientificName}</p>
          <p>Categoria: {especie.category}</p>
          <p>Estado: {especie.conservationStatus}</p>
          <p>Área Avistada: {area ? area.name : "No hay áreas asociadas a esta especie"}</p>
        </div>

        <h5>Comentarios</h5>
        {comments.length ? (
          comments.map((c, i) => (
            <div key={i}>
              <p><strong>Usuario {c.userId}:</strong> {c.text}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios.</p>
        )}

        <h5>Agregar Comentario</h5>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario aquí"
        />
        <button onClick={addComment}>Enviar Comentario</button>

        <h5>Calificar Especie</h5>
        <input
          type="number"
          value={especieRating}
          onChange={(e) => setEspecieRating(e.target.value)}
          min="1"
          max="5"
        />
        <button onClick={addEspecieRating}>Enviar Calificación</button>
      </div>
    </div>
  );
};

export default EspecieModal;
