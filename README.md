# NoteMark Desk

Aplicación de escritorio para tomar notas en Markdown, construida con Electron + React + TypeScript.

## Vista general

![Imagen general](https://github.com/user-attachments/assets/cb9fb666-5005-4d7c-b9da-7f31510ac0eb)

## Directorio de notas

Las notas se guardan como archivos `.md` dentro del directorio de usuario, en:

- Windows/macOS/Linux: `~/Documents/Notemark`

Si la carpeta no existe, la app la crea automáticamente al iniciar o al listar/crear notas. Por seguridad, la creación de nuevas notas solo está permitida dentro de este directorio.

## Funcionalidades

- Crear, leer, editar y eliminar notas Markdown
- Auto-guardado mientras editas
- Nota de bienvenida automática si no hay notas
- Listado con vista previa y fecha de última edición
- Barra superior personalizada con botones estilo macOS:
  - Cerrar, Minimizar y Maximizar/Restaurar
  - Área arrastrable para mover la ventana

### Nota abierta

![Nota abierta](https://github.com/user-attachments/assets/b3a84059-04aa-458d-94d6-653098fb6b5b)

### Botones personalizados (cerrar, minimizar, maximizar, nueva nota, eliminar)

![Botones](https://github.com/user-attachments/assets/d974dfeb-83a3-491f-9cee-52014ce45929)

### Creando una nueva nota

![Creando nota](https://github.com/user-attachments/assets/ef985096-2a9f-4210-92c6-fcfebd18d557)

### Eliminando una nota

![Eliminando nota](https://github.com/user-attachments/assets/bef48c98-d825-44fb-975c-477a8cce1b5a)

## Scripts

### Instalación

```bash
# npm
npm install

# yarn
yarn install
```

### Desarrollo

```bash
# npm
npm run dev

# yarn
yarn dev
```

### Build (empaquetado)

```bash
# Windows
npm run build:win
# o
yarn build:win

# macOS
npm run build:mac
# o
yarn build:mac

# Linux
npm run build:linux
# o
yarn build:linux
```

## Detalles técnicos

- Notas en `~/Documents/Notemark` (`src/shared/constanst.ts` → `appDirectory`)
- Botones estilo macOS y arrastre de ventana:
  - Renderer: `src/renderer/src/components/DraggableTopBar.tsx`
  - Preload (APIs de ventana): `src/preload/index.ts`
  - Main (IPC handlers): `src/main/index.ts`
- Codificación de archivos: `utf8`

## Requisitos recomendados

- VSCode + ESLint + Prettier

