import React from 'react';

const ChapterListTab = ({ chapters, currentPage, onPageChange, hasPrevPage, hasNextPage }) => {
  if (chapters.length === 0) {
    return <div>No hay capítulos disponibles.</div>;
  }

  return (
    <div>
      {/* Mapear y mostrar los capítulos */}
      {chapters.map((chapter) => (
        <div key={chapter._id} className="chapter-card">
          <a href={`/chapter/${chapter._id}/${currentPage}`}>
            <img src={chapter.imageURL} alt={`Chapter ${chapter.number}`} />
          </a>
        </div>
      ))}

      {/* Botones de paginación */}
      <div className="pagination">
        {hasPrevPage && (
          <button onClick={() => onPageChange(currentPage - 1)}>Página Anterior</button>
        )}
        {hasNextPage && (
          <button onClick={() => onPageChange(currentPage + 1)}>Página Siguiente</button>
        )}
      </div>
    </div>
  );
};

export default ChapterListTab;

