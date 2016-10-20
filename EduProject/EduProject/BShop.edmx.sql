
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/20/2016 10:25:18
-- Generated from EDMX file: F:\MySpace\biyesheji\EduProject\EduProject\BShop.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [BShop];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_TypeProduct]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_TypeProduct];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductUserOrderDetail_Product]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductUserOrderDetail] DROP CONSTRAINT [FK_ProductUserOrderDetail_Product];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductUserOrderDetail_UserOrderDetail]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductUserOrderDetail] DROP CONSTRAINT [FK_ProductUserOrderDetail_UserOrderDetail];
GO
IF OBJECT_ID(N'[dbo].[FK_UserOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_UserOrder];
GO
IF OBJECT_ID(N'[dbo].[FK_OrderDetailOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrderDetail] DROP CONSTRAINT [FK_OrderDetailOrder];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Order]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Order];
GO
IF OBJECT_ID(N'[dbo].[Product]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Product];
GO
IF OBJECT_ID(N'[dbo].[Type]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Type];
GO
IF OBJECT_ID(N'[dbo].[User]', 'U') IS NOT NULL
    DROP TABLE [dbo].[User];
GO
IF OBJECT_ID(N'[dbo].[OrderDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OrderDetail];
GO
IF OBJECT_ID(N'[dbo].[Cart]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cart];
GO
IF OBJECT_ID(N'[dbo].[ProductUserOrderDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductUserOrderDetail];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Order'
CREATE TABLE [dbo].[Order] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [STime] datetime  NOT NULL,
    [CName] nvarchar(20)  NOT NULL,
    [CPhone] nvarchar(20)  NOT NULL,
    [CAddress] nvarchar(100)  NOT NULL,
    [PostCode] nvarchar(6)  NOT NULL,
    [TransportWay] nvarchar(20)  NOT NULL,
    [PayWay] nvarchar(20)  NOT NULL,
    [Status] nvarchar(2)  NOT NULL,
    [UserUName] nvarchar(20)  NOT NULL,
    [OrderDate] datetime  NOT NULL
);
GO

-- Creating table 'Product'
CREATE TABLE [dbo].[Product] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PName] nvarchar(20)  NOT NULL,
    [Price] decimal(18,0)  NOT NULL,
    [Detail] nvarchar(20)  NOT NULL,
    [TypeId] int  NOT NULL
);
GO

-- Creating table 'Type'
CREATE TABLE [dbo].[Type] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(20)  NOT NULL,
    [Description] nvarchar(20)  NOT NULL
);
GO

-- Creating table 'User'
CREATE TABLE [dbo].[User] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UName] nvarchar(20)  NOT NULL,
    [Password] nvarchar(20)  NOT NULL,
    [Phone] nvarchar(20)  NOT NULL,
    [Email] nvarchar(50)  NOT NULL,
    [Address] nvarchar(100)  NOT NULL,
    [UType] nvarchar(2)  NOT NULL,
    [Age] nchar(10)  NULL,
    [Sex] nchar(10)  NULL
);
GO

-- Creating table 'OrderDetail'
CREATE TABLE [dbo].[OrderDetail] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Num] int  NOT NULL,
    [Price] decimal(18,0)  NOT NULL,
    [Order_Id] int  NOT NULL
);
GO

-- Creating table 'Cart'
CREATE TABLE [dbo].[Cart] (
    [RecordId] int IDENTITY(1,1) NOT NULL,
    [CartId] nvarchar(max)  NOT NULL,
    [Count] int  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [PName] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'ProductUserOrderDetail'
CREATE TABLE [dbo].[ProductUserOrderDetail] (
    [Product_Id] int  NOT NULL,
    [UserOrderDetail_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Order'
ALTER TABLE [dbo].[Order]
ADD CONSTRAINT [PK_Order]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Product'
ALTER TABLE [dbo].[Product]
ADD CONSTRAINT [PK_Product]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Type'
ALTER TABLE [dbo].[Type]
ADD CONSTRAINT [PK_Type]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [UName] in table 'User'
ALTER TABLE [dbo].[User]
ADD CONSTRAINT [PK_User]
    PRIMARY KEY CLUSTERED ([UName] ASC);
GO

-- Creating primary key on [Id] in table 'OrderDetail'
ALTER TABLE [dbo].[OrderDetail]
ADD CONSTRAINT [PK_OrderDetail]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [RecordId] in table 'Cart'
ALTER TABLE [dbo].[Cart]
ADD CONSTRAINT [PK_Cart]
    PRIMARY KEY CLUSTERED ([RecordId] ASC);
GO

-- Creating primary key on [Product_Id], [UserOrderDetail_Id] in table 'ProductUserOrderDetail'
ALTER TABLE [dbo].[ProductUserOrderDetail]
ADD CONSTRAINT [PK_ProductUserOrderDetail]
    PRIMARY KEY CLUSTERED ([Product_Id], [UserOrderDetail_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [TypeId] in table 'Product'
ALTER TABLE [dbo].[Product]
ADD CONSTRAINT [FK_TypeProduct]
    FOREIGN KEY ([TypeId])
    REFERENCES [dbo].[Type]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_TypeProduct'
CREATE INDEX [IX_FK_TypeProduct]
ON [dbo].[Product]
    ([TypeId]);
GO

-- Creating foreign key on [Product_Id] in table 'ProductUserOrderDetail'
ALTER TABLE [dbo].[ProductUserOrderDetail]
ADD CONSTRAINT [FK_ProductUserOrderDetail_Product]
    FOREIGN KEY ([Product_Id])
    REFERENCES [dbo].[Product]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [UserOrderDetail_Id] in table 'ProductUserOrderDetail'
ALTER TABLE [dbo].[ProductUserOrderDetail]
ADD CONSTRAINT [FK_ProductUserOrderDetail_UserOrderDetail]
    FOREIGN KEY ([UserOrderDetail_Id])
    REFERENCES [dbo].[OrderDetail]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductUserOrderDetail_UserOrderDetail'
CREATE INDEX [IX_FK_ProductUserOrderDetail_UserOrderDetail]
ON [dbo].[ProductUserOrderDetail]
    ([UserOrderDetail_Id]);
GO

-- Creating foreign key on [UserUName] in table 'Order'
ALTER TABLE [dbo].[Order]
ADD CONSTRAINT [FK_UserOrder]
    FOREIGN KEY ([UserUName])
    REFERENCES [dbo].[User]
        ([UName])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UserOrder'
CREATE INDEX [IX_FK_UserOrder]
ON [dbo].[Order]
    ([UserUName]);
GO

-- Creating foreign key on [Order_Id] in table 'OrderDetail'
ALTER TABLE [dbo].[OrderDetail]
ADD CONSTRAINT [FK_OrderDetailOrder]
    FOREIGN KEY ([Order_Id])
    REFERENCES [dbo].[Order]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_OrderDetailOrder'
CREATE INDEX [IX_FK_OrderDetailOrder]
ON [dbo].[OrderDetail]
    ([Order_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------