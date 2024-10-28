CREATE TABLE Cliente (
    ClienteID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL
);

CREATE TABLE Menu(
    MenuID INT PRIMARY KEY,
    ClienteID INT NOT NULL, 
    NombrePlato VARCHAR(100) NOT NULL,
    Ingredientes VARCHAR(100) NOT NULL,
    Valores VARCHAR(100) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Menu(ClienteID)
)

CREATE TABLE Proveedor(
    ProveedorID INT PRIMARY KEY,
    AdministradorID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,    
    FOREIGN KEY (AdministradorID) REFERENCES Administrador(AdministradorID)
);

CREATE TABLE Turno(
    TurnoID INT PRIMARY KEY,
    AdministradorID INT NOT NULL,
    Fecha DATE NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    FOREIGN KEY (AdministradorID) REFERENCES Administrador(AdministradorID)
);

CREATE TABLE Inventario(    
    InventarioID INT PRIMARY KEY,
    ProveedorID INT NOT NULL,
    Fecha DATE NOT NULL,
    CantidadTotal INT NOT NULL,
    Estado VARCHAR(100) NOT NULL,    
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID)
);

CREATE TABLE Empleado(
    EmpleadoID INT PRIMARY KEY,
    TurnoID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,    
    FOREIGN KEY (TurnoID) REFERENCES Turno(TurnoID)
);

CREATE TABLE Mesero(
    MeseroID INT PRIMARY KEY,
    EmpleadoID INT PRIMARY KEY,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)
);

CREATE TABLE Chef(
    ChefID INT PRIMARY KEY,
    EmpleadoID INT PRIMARY KEY,
    Especialidad VARCHAR(100) NOT NULL, 
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)    
);

CREATE TABLE Administrador(
    AdministradorID INT PRIMARY KEY,
    EmpleadoID INT PRIMARY KEY,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)
);

CREATE TABLE Pedido(
    PedidoID INT PRIMARY KEY,
    ClienteID INT NOT NULL,
    MeseroID INT NOT NULL,
    Fecha DATE NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    Total INT NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID),
    FOREIGN KEY (MeseroID) REFERENCES Mesero(MeseroID)
);

CREATE TABLE Plato(
    PlatoID INT PRIMARY KEY, 
    InventarioID INT NOT NULL,
    MenuID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10,2) NOT NULL
    Disponibilidad BOOLEAN NOT NULL,    
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID),
    FOREIGN KEY (MenuID) REFERENCES Menu(MenuID)
);

CREATE TABLE Ingrediente(
    IngredienteID INT PRIMARY KEY,
    ProveedorID INT NOT NULL,
    InventarioID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    CantidadInventario INT NOT NULL,
    UnidadMedida VARCHAR(100) NOT NULL,
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID),
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID)
);

CREATE TABLE JefeCocina(
    JefeCocinaID INT PRIMARY KEY,
    ChefID INT PRIMARY KEY,
    InventarioID INT NOT NULL,
    AdministradorID INT NOT NULL,
    PermisoInventario BOOLEAN NOT NULL,
    FechaAsignacionRol DATE NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID),
    FOREIGN KEY (AdministradorID) REFERENCES Administrador(AdministradorID),
    FOREIGN KEY (ChefID) REFERENCES Chef(ChefID)
);

CREATE TABLE Contiene(
    PedidoID INT PRIMARY KEY,
    PlatoID INT PRIMARY KEY,
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID),
    FOREIGN KEY (PlatoID) REFERENCES Plato(PlatoID)
); 

CREATE TABLE Formado(
    PlatoID INT PRIMARY KEY,
    IngredienteID INT PRIMARY KEY,
    FOREIGN KEY (PlatoID) REFERENCES Plato(PlatoID),
    FOREIGN KEY (IngredienteID) REFERENCES Ingrediente(IngredienteID)
);
