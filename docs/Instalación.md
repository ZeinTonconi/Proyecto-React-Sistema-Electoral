# Instalación
Para poder tener el proyecto de manera local para su uso se deben seguir los siguientes pasos:
## Paso 1: Clonar el repositorio de GitHub
Abre tu terminal y navega a la carpeta en la cual deseas clonar el repositorio:
```
cd proyectos-react
```
Una vez dentro de esta clona el repositorio y navega hacia este:
```
git clone https://github.com/ZeinTonconi/Proyecto-React-Sistema-Electoral.git
cd Proyecto-React-Sistema-Electoral
```
## Paso 2: Instalar las dependencias
Instala todas las dependencias usando npm:
```
npm install
```
## Paso 3: Levantar JsonServer
Asegurate de tener instalado JsonServer:
```
npm install json-server
```
Levanta el servidor apuntando al archivo db.json:
```
npx json-server db.json
```
## Paso 4: Levantar el proyecto
Inicia la aplicación en modo desarrollo con npm:
```
npm run dev
```
## Paso 5: Navegar al link correspondiente
Navega al siguiente link en tu navegador:
```
http://localhost:5173/
```
Asegúrate de que tanto el servidor JSON como la aplicación React estén corriendo al mismo tiempo.
# Verificación
Para verificar que la aplicación está funcionando de manera correcta se puede realizar el login con el usuario de prueba con las credenciales:
- C.I.: 1234567
- Fecha de nacimiento: 15/05/2002

Si todo esta instalado de manera correcta se permitirá el logeo a la aplicación.
