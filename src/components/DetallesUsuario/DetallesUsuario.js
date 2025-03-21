import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal"; 
import { Button } from "react-bootstrap"; 

const DetallesUsuario = ({ userId, showModal, setShowModal }) => {
  const [activities, setActivities] = useState([]);
  const [species, setSpecies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //MODAL PARA LOS DATOS
  useEffect(() => {
    if (showModal && userId) {
      setLoading(true);
      setError(""); 

      // Fetching actividades
      fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/byUser?secret=TallerReact2025!&userId=${userId}&page=1&pageSize=10`)
        .then((response) => response.json())
        .then((data) => {
          setActivities(data.items || []);
        })
        .catch(() => setError("Error al cargar actividades"));

      // Fetching especies
      fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/byUser?secret=TallerReact2025!&userId=${userId}&page=1&pageSize=10`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Species:", data);
          setSpecies(data.items || []);
        })
        .catch(() => setError("Error al cargar especies"));

      // Fetching areas naturales
      fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/byUser?secret=TallerReact2025!&userId=${userId}&page=1&pageSize=10`)
        .then((response) => response.json())
        .then((data) => {
          setAreas(data.items || []);
        })
        .catch(() => setError("Error al cargar áreas naturales"))
        .finally(() => setLoading(false));
    }
  }, [showModal, userId]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            <h3>Actividades Registradas</h3>
            <ul className="list-group">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <li key={activity.id} className="list-group-item">{activity.description}</li>
                ))
              ) : (
                <li className="list-group-item">No hay actividades registradas.</li>
              )}
            </ul>

            <h3 className="mt-4">Especies Registradas</h3>
            <ul className="list-group">
              {species.length > 0 ? (
                species.map((specie) => (
                  <li key={specie.id} className="list-group-item">{specie.commonName}</li>
                ))
              ) : (
                <li className="list-group-item">No hay especies registradas.</li>
              )}
            </ul>

            <h3 className="mt-4">Áreas Naturales</h3>
            <ul className="list-group">
              {areas.length > 0 ? (
                areas.map((area) => (
                  <li key={area.id} className="list-group-item">{area.name}</li>
                ))
              ) : (
                <li className="list-group-item">No hay áreas naturales registradas.</li>
              )}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetallesUsuario;
