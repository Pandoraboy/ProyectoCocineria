CREATE TABLE Cliente (
    ClienteID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL
);

CREATE TABLE Administrador(
    AdministradorID INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Contacto VARCHAR(100) NOT NULL
);

CREATE TABLE Menu(
    MenuID INT PRIMARY KEY,
    ClienteID INT NOT NULL, 
    NombrePlato VARCHAR(100) NOT NULL,
    Ingredientes VARCHAR(100) NOT NULL,
    Valores VARCHAR(100) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
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
    InventarioID INT PRIMARY KEY UNIQUE,
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
    MeseroID INT UNIQUE,
    EmpleadoID INT,
    PRIMARY KEY (MeseroID, EmpleadoID),
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(EmpleadoID)
);

CREATE TABLE Chef(
    ChefID INT UNIQUE,
    EmpleadoID INT,
    Especialidad VARCHAR(100) NOT NULL, 
    PRIMARY KEY (ChefID, EmpleadoID),
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
    Precio DECIMAL(10,2) NOT NULL,
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
    JefeCocinaID INT,
    ChefID INT,
    InventarioID INT NOT NULL,
    AdministradorID INT NOT NULL,
    PermisoInventario BOOLEAN NOT NULL,
    FechaAsignacionRol DATE NOT NULL,
    Estado VARCHAR(100) NOT NULL,
    FOREIGN KEY (InventarioID) REFERENCES Inventario(InventarioID),
    FOREIGN KEY (AdministradorID) REFERENCES Administrador(AdministradorID),
    FOREIGN KEY (ChefID) REFERENCES Chef(ChefID),
    PRIMARY KEY (JefeCocinaID, ChefID)
);

CREATE TABLE Contiene(
    PedidoID INT,
    PlatoID INT,
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID),
    FOREIGN KEY (PlatoID) REFERENCES Plato(PlatoID),
    PRIMARY KEY (PedidoID, PlatoID)
); 

CREATE TABLE Formado(
    PlatoID INT,
    IngredienteID INT,
    FOREIGN KEY (PlatoID) REFERENCES Plato(PlatoID),
    FOREIGN KEY (IngredienteID) REFERENCES Ingrediente(IngredienteID),
    PRIMARY KEY (PlatoID, IngredienteID)
);

CREATE TABLE Provee(
    ProveedorID INT,
    IngredienteID INT,
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID),
    FOREIGN KEY (IngredienteID) REFERENCES Ingrediente(IngredienteID),
    PRIMARY KEY (ProveedorID, IngredienteID)
);
--INSERSION DE DATOS

-- Insertar datos en Cliente
INSERT INTO Cliente (ClienteID, Nombre, Contacto) VALUES 
(1, 'Juan Pérez', 'juan.perez@example.com'),
(2, 'María Gómez', 'maria.gomez@example.com'),
(3, 'Carlos López', 'carlos.lopez@example.com');

-- Insertar datos en Administrador
INSERT INTO Administrador (AdministradorID, Nombre, Contacto) VALUES 
(1, 'Ana Torres', 'ana.torres@example.com'),
(2, 'Luis García', 'luis.garcia@example.com');

-- Insertar datos en Menu
INSERT INTO Menu (MenuID, ClienteID, NombrePlato, Ingredientes, Valores) VALUES 
(1, 1, 'Ensalada César', 'Lechuga, Pollo, Queso Parmesano', 'Vegetariano'),
(2, 2, 'Pizza Margherita', 'Tomate, Mozzarella, Albahaca', 'Vegetariano'),
(3, 3, 'Spaghetti Bolognese', 'Pasta, Carne, Tomate', 'Carnívoro');

-- Insertar datos en Proveedor
INSERT INTO Proveedor (ProveedorID, AdministradorID, Nombre, Contacto, Direccion) VALUES 
(1, 1, 'Proveedor ABC', 'contacto@proveedorabc.com', 'Calle 123, Ciudad'),
(2, 2, 'Distribuidora XYZ', 'contacto@distribuidoraxyz.com', 'Avenida 456, Ciudad');

-- Insertar datos en Turno
INSERT INTO Turno (TurnoID, AdministradorID, Fecha, HoraInicio, HoraFin) VALUES 
(1, 1, '2024-10-01', '08:00:00', '16:00:00'),
(2, 2, '2024-10-02', '16:00:00', '00:00:00');

-- Insertar datos en Inventario
INSERT INTO Inventario (InventarioID, ProveedorID, Fecha, CantidadTotal, Estado) VALUES 
(1, 1, '2024-10-01', 100, 'Disponible'),
(2, 2, '2024-10-02', 200, 'Disponible');

-- Insertar datos en Empleado
INSERT INTO Empleado (EmpleadoID, TurnoID, Nombre, Contacto) VALUES 
(1, 1, 'Pedro Silva', 'pedro.silva@example.com'),
(2, 2, 'Lucía Rojas', 'lucia.rojas@example.com');

-- Insertar datos en Mesero
INSERT INTO Mesero (MeseroID, EmpleadoID) VALUES 
(1, 1),
(2, 2);

-- Insertar datos en Chef
INSERT INTO Chef (ChefID, EmpleadoID, Especialidad) VALUES 
(1, 1, 'Italiana'),
(2, 2, 'Japonesa');

-- Insertar datos en Pedido
INSERT INTO Pedido (PedidoID, ClienteID, MeseroID, Fecha, Estado, Total) VALUES 
(1, 1, 1, '2024-10-01', 'Entregado', 15000),
(2, 2, 2, '2024-10-02', 'Pendiente', 20000);

-- Insertar datos en Plato
INSERT INTO Plato (PlatoID, InventarioID, MenuID, Nombre, Descripcion, Precio, Disponibilidad) VALUES 
(1, 1, 1, 'Ensalada César', 'Ensalada con pollo y queso parmesano', 8500, TRUE),
(2, 2, 2, 'Pizza Margherita', 'Pizza con tomate, mozzarella y albahaca', 12000, TRUE);

-- Insertar datos en Ingrediente
INSERT INTO Ingrediente (IngredienteID, ProveedorID, InventarioID, Nombre, CantidadInventario, UnidadMedida) VALUES 
(1, 1, 1, 'Lechuga', 50, 'Kg'),
(2, 1, 1, 'Pollo', 30, 'Kg'),
(3, 2, 2, 'Tomate', 40, 'Kg');

-- Insertar datos en JefeCocina
INSERT INTO JefeCocina (JefeCocinaID, ChefID, InventarioID, AdministradorID, PermisoInventario, FechaAsignacionRol, Estado) VALUES 
(1, 1, 1, 1, TRUE, '2024-10-01', 'Activo'),
(2, 2, 2, 2, TRUE, '2024-10-02', 'Activo');

-- Insertar datos en Contiene
INSERT INTO Contiene (PedidoID, PlatoID) VALUES 
(1, 1),
(2, 2);

-- Insertar datos en Formado
INSERT INTO Formado (PlatoID, IngredienteID) VALUES 
(1, 1),
(1, 2),
(2, 3);

