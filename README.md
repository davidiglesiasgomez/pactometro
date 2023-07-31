# Pactómetro del 23J

Pactómetro del 23J es una aplicación web que permite calcular quien obtiene la presidencia en el Congreso de los Diputados de España a partir de los resultados de las elecciones generales del 23 de julio de 2023 (pendiente del contabilizar el voto CERA).

El funcionamiento es simple. Se seleccionan los partidos que se desean y haciendo click se asignan a los bloques de "A favor", "En contra" y "Abstención" con todos los diputados. La presidencia se obtiene por tener mayoría absoluta en el bloque "A favor" en primera vuelta o por tener mayoría simple en el bloque "A favor" en segunda vuelta, votación que se hace 48 horas más tarde.

Está previsto añadir un mecanismo para asignar diputados de forma individual a los bloques, visto lo que puede pasar con la contabilización del voto CERA.

La aplicación está temporalmente alojada en [https://splendid-faloodeh-d685c6.netlify.app/](https://splendid-faloodeh-d685c6.netlify.app/).

***

Resultados de las elecciones [https://resultados.generales23j.es/es/inicio/0](https://resultados.generales23j.es/es/inicio/0).

La aplicación está desarrollada con [React](https://reactjs.org/) y [Vite](https://vitejs.dev/). También usa [Tailwind CSS](https://tailwindcss.com/) para el diseño.
