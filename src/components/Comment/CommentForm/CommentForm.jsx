// CommentForm.js

import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import onwerUserService from '../../../services/onwerUserService';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import commentCreateService from '../../../services/commentCreateService';
import Avatar from '../../Avatar/Avatar';

const CommentForm = ({ id, onAddComment }) => {
    const { token } = useAuth();
    const [text, setText] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [userComment, setUserComment] = useState(null);

    useEffect(() => {
        const fetchUserComment = async () => {
            try {
                const userData = await onwerUserService(token);
                setUserComment(userData);
            } catch (error) {
                console.error('Error al obtener el usuario para comentar', error);
            }
        };

        fetchUserComment();
    }, [token]);

    const handleSubmitComment = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            await commentCreateService(text, id, token);

            // Obtén los datos actualizados del usuario y crea un nuevo comentario con esa información
            const updatedUserComment = await onwerUserService(token);
            const newComment = {
                avatar: updatedUserComment.avatar,
                username: updatedUserComment.username,
                text,
            };

            // Agrega el nuevo comentario a la lista de comentarios utilizando la función de callback
            onAddComment(newComment);

            // Limpia el campo de texto después de enviar el comentario
            setText('');
            window.location.reload();
        } catch (err) {
            setErrMsg(err.msg || 'Hubo un error al comentar, inténtelo de nuevo más tarde');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                {/* Comprobamos si userComment tiene datos antes de pasarlos a Avatar */}
                {userComment && (
                    <Avatar avatar={userComment.avatar} username={userComment.username} />
                )}
            </div>
            <div>
                <input type="text" placeholder="comentar..." value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={handleSubmitComment} disabled={loading}>Enviar comentario</button>
                {loading && <p>loading...</p>}
                {errMsg && <ErrorMessage msg={errMsg} />}
            </div>
        </div>
    );
};

export default CommentForm;