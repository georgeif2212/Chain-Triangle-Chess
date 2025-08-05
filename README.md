# ♟️ Triangular Chess

Triangular Chess es un videojuego educativo multijugador por equipos, desarrollado como parte de un proyecto de servicio social en la Universidad Autónoma Metropolitana (UAM), con el objetivo de facilitar el aprendizaje . El juego combina estrategia en un tablero hexagonal con preguntas abiertas y de opción múltiple configurables según materia y tema provenientes de la plataforma universitaria VAEP.

## 📌 Características principales

- 🔺 Tablero hexagonal con vértices y conexiones creadas dinámicamente en HTML5 Canvas usando React Konva.
- 📚 Modo de juego con preguntas (o sin ellas) para apoyar el aprendizaje en distintas materias.
- 🧠 Cada movimiento correcto permite responder una pregunta para seguir avanzando.
- 🧑‍🏫 Integración con la plataforma VAEP de la UAM para lanzar el juego con parámetros personalizados.
- 🎨 Interfaz moderna con MUI y estilos modulares.
- 🔒 Autenticación e identificación de usuarios mediante tokens.

---

## 🧩 Tecnologías utilizadas

- ⚛️ React
- 🎨 MUI (Material UI)
- 🎨 CSS Modules
- 🧮 React Konva (HTML5 Canvas para representar el tablero)
- 🔥 Firebase (Autenticación y base de datos)
- 🌐 React Router DOM
- ⚙️ Vite (bundler y servidor de desarrollo)

---

## 📂 Estructura del proyecto

El proyecto está organizado en módulos según responsabilidad (componentes, páginas, estilos, servicios, etc.), destacando:

- `game/components/board/`: componentes visuales del tablero (hexágonos, vértices, conexiones).
- `game/hooks/`: hooks personalizados para lógica de juego, preguntas, selección, etc.
- `game/services/`: lógica de movimiento y reglas del juego.
- `game/pages/`: vistas del flujo del juego (inicio, en juego, finalización).
- `firebase/`: configuración de conexión con Firebase.
- `contexts/`: contexto global del juego.

---

## 🧪 Cómo ejecutar el proyecto

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tuusuario/triangular-chess.git
    cd triangular-chess
    ```
2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura Firebase:

    Crea un archivo `.env` con tus credenciales o edita `firebaseConfiguration.js` y `firebaseVAEP.js` con los valores de tu proyecto Firebase.

4. Ejecuta el proyecto:

   ```bash
   npm start
   ```

5. Accede a: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Anexo: Evidencia visual del funcionamiento del juego

A continuación, se presentan capturas de pantalla del juego *Triangular Chess* en tres momentos clave. Estas evidencias forman parte del cuerpo del informe y se incluyen aquí como material de apoyo visual.


### 📌 Menú principal

<div align="center">
  <img src="./public/screenshots/triangleChess1.png" alt="Menú principal" width="70%"/>
</div>  
*Figura 1. Menú principal del juego.*

---

### 🎮 Inicio del juego con pregunta educativa

<div align="center">
  <img src="./public/screenshots/triangleChess2.png" alt="Inicio del juego" width="70%"/>
</div>  
*Figura 2. Interfaz del juego durante una partida, con una pregunta mostrada tras un movimiento válido.*

---

### 🏁 Fin del juego

<div align="center">
  <img src="./public/screenshots/triangleChess3.png" alt="Fin del juego" width="70%"/>
</div>  
*Figura 3. Pantalla final que anuncia el equipo ganador al finalizar la partida.*

---

## 🛠️ Modo de uso (VAEP)

La plataforma VAEP lanza el juego mediante una URL con parámetros:

```
https://triangularchess.web.app/game/?mode=conPreguntas&materia=Matemáticas&tema=Álgebra&token=xyz123
```

El juego recibe esta información y prepara dinámicamente el contenido de preguntas, los equipos y la lógica del juego.

---

## 🧠 Lógica de juego

- Cada equipo elige un vértice para moverse.
- Si responde correctamente una pregunta, puede avanzar.
- El objetivo es formar triángulos y ganar puntos estratégicamente.
- El movimiento y la estrategia se rigen por un patrón definido en `MoveStrategyFactory`.

---

## 📌 Estado actual

✅ MVP funcional
🧪 Pruebas internas realizadas
🚀 Desplegado en Firebase Hosting

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del servicio social universitario y está bajo uso académico, sin fines de lucro. Para reutilización o ampliación, contactar con la UAM o con el autor.

---

## 🙋‍♂️ Autor

Desarrollado por **Jorge Infante Fragoso**

Estudiante de Ingeniería en Computación

Universidad Autónoma Metropolitana – Unidad Cuajimalpa

---
