import React from 'react';

const MangaInfoTab = ({ manga }) => {
  if (!manga) {
    return <div>Cargando detalles del manga...</div>;
  }

  return (
    <div>
      <h2>{manga.title}</h2>
      <img src={manga.coverImageURL} alt={manga.title} />
      <p>{manga.synopsis}</p>
      {/* Mostrar más detalles del manga aquí */}
    </div>
  );
};

export default MangaData;
