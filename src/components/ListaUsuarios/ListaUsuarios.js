import { useState, useEffect } from "react";
import DetallesUsuario from "../DetallesUsuario/DetallesUsuario";

const ListaUsuarios = ({ closeModal }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const userId = 1; // Temporalmente fijo
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleShowModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };
    const fetchUsers = async (pageNumber) => {
        setLoading(true);
    
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/user/list?secret=TallerReact2025!&page=${pageNumber}&pageSize=${pageSize}`
            );
    
            if (!response.ok) throw new Error(`Error en la API: ${response.status}`);
    
            const data = await response.json();
    
            if (data.users?.items) {
                setUsers((prevUsers) => {
                    const mergedUsers = [...prevUsers, ...data.users.items];
                    const uniqueUsers = Array.from(new Map(mergedUsers.map(user => [user.id, user])).values());
                    return uniqueUsers;
                });
                setTotalRecords(data.users.totalRecords || 0);
            } else {
                setError("No se encontraron usuarios.");
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("Error al obtener los usuarios. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };
    
//Para escrolear y mostrar todos los usuarios
    const handleScroll = (e) => {
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
    
        if (scrollHeight - scrollTop - clientHeight < 100 && users.length < totalRecords && !loading) {
            console.log("Cargando más usuarios...");
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchUsers(nextPage); // Cargar la siguiente página
                return nextPage;
            });
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body" onScroll={handleScroll} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <button className="modal-close" onClick={closeModal}>X</button>
                    <h2 className="card-title text-center mb-4">Lista de Usuarios</h2>
                    
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    
                    <button 
                        onClick={() => fetchUsers(page)} 
                        className="btn btn-primary w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Cargar Usuarios"}
                    </button>

                    <ul className="list-group">
                        {users.map((user) => (
                            <li key={user.id} className="list-group-item">
                                <h5 className="mb-1" onClick={() => handleShowModal(user.id)} style={{ cursor: 'pointer' }}>
                                    {user.name}
                                </h5>
                                <p className="text-muted">{user.email}</p>
                            </li>
                        ))}
                    </ul>

                    {loading && <div className="text-center mt-3">Cargando más usuarios...</div>}
                </div>
            </div>

            {showModal && (
                <DetallesUsuario
                    userId={selectedUserId}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    );
};

export default ListaUsuarios;
