1235456789

CREATE TABLE Cliente (
    ClienteID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL
);

CREATE TABLE Pedido(
    PedidoID INT PRIMARY KEY,
    ClienteID INT NOT NULL,
    Fecha DATE NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE Turno(
    TurnoID INT PRIMARY KEY,
    Fecha DATE NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL
);

CREATE TABLE Empleado(
    EmpleadoID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    TurnoID INT NOT NULL,
    FOREIGN KEY (TurnoID) REFERENCES Turno(TurnoID)
);

CREATE TABLE Mesero(
    EmpleadoID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    TurnoID INT NOT NULL,
    FOREIGN KEY (TurnoID) REFERENCES Turno(TurnoID)
);

CREATE TABLE Chef(
    ChefID INT PRIMARY KEY,
    EmpleadoID INT NOT NULL,
    Especialidad VARCHAR(100) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)
);

CREATE TABLE Administrador(
    AdministradorID INT PRIMARY KEY,
    EmpleadoID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)
);

CREATE TABLE Inventario(
    InventarioID INT PRIMARY KEY,
    Fecha DATE NOT NULL,
    CantidadTotal INT NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    ProveedorID INT NOT NULL,
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID)
);

CREATE TABLE Proveedor(
    ProveedorID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    AdministradorID INT NOT NULL,
    InventarioID INT NOT NULL,
    FOREIGN KEY (AdministradorID) REFERENCES Administrador(AdministradorID),
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID)
);

CREATE TABLE Ingrediente(
    IngredienteID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    CantidadInventario INT NOT NULL,
    UnidadMedida VARCHAR(100) NOT NULL
);

CREATE TABLE Plato(
    PlatoID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10,2) NOT NULL
    Disponibilidad BOOLEAN NOT NULL,
    InventarioID INT NOT NULL,
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID)
);

CREATE TABLE JefeCocina(
    JefeCocinaID INT PRIMARY KEY,
    PermisoInventario BOOLEAN NOT NULL,
    FechaAsignacionRol DATE NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    ChefID INT NOT NULL,
    FOREIGN KEY (ChefID) REFERENCES Chef(ChefID)
);

--Relaciones--
CREATE TABLE Provee(
    ProveedorID INT NOT NULL,
    IngredienteID INT NOT NULL,
    PRIMARY KEY (ProveedorID, IngredienteID),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID),
    FOREIGN KEY (IngredienteID) REFERENCES Ingrediente(IngredienteID)
);

CREATE TABLE InventarioContiene(
    InventarioID INT NOT NULL,
    IngredienteID INT NOT NULL,
    PRIMARY KEY (InventarioID, IngredienteID),
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID),
    FOREIGN KEY (IngredienteID) REFERENCES Ingrediente(IngredienteID)
);

CREATE TABLE PedidoContiene(
    PedidoID INT NOT NULL,
    PlatoID INT NOT NULL,
    PRIMARY KEY (PedidoID, PlatoID),
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID),
    FOREIGN KEY (PlatoID) REFERENCES Plato(PlatoID)
);
