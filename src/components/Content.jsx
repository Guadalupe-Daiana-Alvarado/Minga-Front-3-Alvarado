import React from 'react'

const Content = (props) => {
    let {manga, chapters, hasPrevPage, hasNextPage, showChapters } = props

    console.log(showChapters)
  return (
    <div>
      { showChapters ? (<div>
        <ul>
          {chapters.map((chapter, Index) => (
            <li key={Index}>
              {/* Enlace a la página de detalle del capítulo */}
              <a href={`/chapters/${chapter?.id}/${chapter?.page}`}>{chapter?.title}</a>
            </li>
          ))}
        </ul>

        {/* Botones de paginación */}
        <div>
          {hasPrevPage && (
            <button onClick={() => setCurrentPage((prev) => prev - 1)}>Página anterior</button>
          )}
          {hasNextPage && (
            <button onClick={() => setCurrentPage((prev) => prev + 1)}>Página siguiente</button>
          )}
        </div>
      </div> ): (<div>
          <h1>{manga?.title}</h1>
          <p>{manga?.description}</p>
          {/* Aquí puedes mostrar otros detalles del manga */}
        </div>)    
   }
    </div>
  )
}

export default Content