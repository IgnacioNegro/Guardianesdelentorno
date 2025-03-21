import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./AreaNaturalModal.css";

const AreaNaturalModal = ({ closeModal, area, especiesAvistadas }) => {
  const [comments, setComments] = useState([]);
  const [areaRating, setAreaRating] = useState(0);  // Calificación del área
  const [newComment, setNewComment] = useState("");  // Comentario del usuario
  const user = useSelector((state) => state.user);
  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: area.latitude || -34.474,  // Coordenadas por defecto si no están definidas
    lng: area.longitude || -57.848
  });

  const autocompleteRef = useRef(null);

  // Obtener comentarios al montar el modal
  useEffect(() => {
    fetchComments();
  }, [area]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/comment/byEntityId?secret=TallerReact2025!&userId=123&naturalAreaId=${area.id}&page=1&pageSize=10`
      );
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      alert("Hubo un error al obtener los comentarios. Por favor, intenta más tarde.");
    }
  };

  const addAreaRating = async () => {
    if (areaRating < 1 || areaRating > 5) {
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
              speciesId: null,
              text: "Calificación del área",  // Texto fijo de calificación
              rating: Number(areaRating),   // La calificación del área
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
              speciesId: null,  // Si no se trata de una especie específica, dejamos esto como null
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

  // Función que captura el click en el mapa para actualizar la posición del marcador
  const handleMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPosition(clickedPosition);
    console.log("Coordenadas seleccionadas:", clickedPosition);
  };

  return (
    <div className="register-container">
      <div className="form-register">
        <button className="modal-close" onClick={closeModal}>
          ✖
        </button>
        <img src={area.imageUrl} alt="Imagen del área" style={{ maxWidth: "100%" }} />
        <p><strong>Nombre:</strong> {area.name}</p>
        <p><strong>Región:</strong> {area.region}</p>
        <p><strong>Descripción:</strong> {area.description}</p>
        <p><strong>Ubicación:</strong> {area.location}</p>

        <h5>Especies Avistadas</h5>
        {especiesAvistadas.length ? (
          <ul>
            {especiesAvistadas.map((especie, i) => (
              <li key={i}>{especie.commonName}</li>
            ))}
          </ul>
        ) : (
          <p>No se registraron especies.</p>
        )}

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

        <h5>Calificar Área</h5>
        <input
          type="number"
          value={areaRating}
          onChange={(e) => setAreaRating(e.target.value)}
          min="1"
          max="5"
        />
        <button onClick={addAreaRating}>Enviar Calificación</button>

        {/* Mapa de Google */}
        <h5>Ubicación en el mapa</h5>
        <LoadScript googleMapsApiKey="AIzaSyBstx3zu1gx2dlcnGXyuDTUfLGNORF0R40" libraries={['places']}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={15}
            onClick={handleMapClick}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default AreaNaturalModal;
