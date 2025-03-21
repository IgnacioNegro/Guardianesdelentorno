import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ActividadModal.css";

const ActividadModal = ({ closeModal, actividad, area }) => {
  const [comments, setComments] = useState([]);
  const [actividadRating, setActividadRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchComments();
  }, [actividad]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/comment/byEntityId?secret=TallerReact2025!&userId=123&activityId=${actividad.id}&page=1&pageSize=10`
      );
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      alert("Hubo un error al obtener los comentarios. Por favor, intenta más tarde.");
    }
  };

  const addActividadRating = async () => {
    if (actividadRating < 1 || actividadRating > 5) {
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
              activityId: actividad.id, 
              text: "Calificación de la actividad",
              rating: Number(actividadRating),
            },
          }),
        }
      );

      if (response.ok) {
        alert("Calificación agregada exitosamente.");
        fetchComments();
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
              activityId: actividad.id,
              text: newComment,
              rating: null,
            },
          }),
        }
      );

      if (response.ok) {
        alert("Comentario agregado exitosamente.");
        setNewComment("");
        fetchComments();
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
          <p><strong>Actividad:</strong> {actividad.title}</p>
          <p><strong>Fecha:</strong> {actividad.date}</p>
          <p><strong>Descripción:</strong> {actividad.description}</p>
          <p><strong>Área Natural:</strong> {area ? area.name : "No hay área asociada a esta actividad"}</p>
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

        <h5>Calificar Actividad</h5>
        <input
          type="number"
          value={actividadRating}
          onChange={(e) => setActividadRating(e.target.value)}
          min="1"
          max="5"
        />
        <button onClick={addActividadRating}>Enviar Calificación</button>
      </div>
    </div>
  );
};

export default ActividadModal;
