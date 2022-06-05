declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      DB_PASSWORD: string
      DB_ROOT_PASSWORD: string
      DB_PORT: number
      DB_NAME: string
      NODE_ENV?: 'production' | 'development' | undefined
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
