
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/31/2016 13:49:19
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

IF OBJECT_ID(N'[dbo].[FK_CartUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Cart] DROP CONSTRAINT [FK_CartUser];
GO
IF OBJECT_ID(N'[dbo].[FK_OrderDetailOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrderDetail] DROP CONSTRAINT [FK_OrderDetailOrder];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductOrderDetail_OrderDetail]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductOrderDetail] DROP CONSTRAINT [FK_ProductOrderDetail_OrderDetail];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductOrderDetail_Product]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductOrderDetail] DROP CONSTRAINT [FK_ProductOrderDetail_Product];
GO
IF OBJECT_ID(N'[dbo].[FK_TypeProduct]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_TypeProduct];
GO
IF OBJECT_ID(N'[dbo].[FK_UserOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_UserOrder];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Cart]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cart];
GO
IF OBJECT_ID(N'[dbo].[Order]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Order];
GO
IF OBJECT_ID(N'[dbo].[OrderDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OrderDetail];
GO
IF OBJECT_ID(N'[dbo].[Product]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Product];
GO
IF OBJECT_ID(N'[dbo].[ProductOrderDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductOrderDetail];
GO
IF OBJECT_ID(N'[dbo].[Type]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Type];
GO
IF OBJECT_ID(N'[dbo].[User]', 'U') IS NOT NULL
    DROP TABLE [dbo].[User];
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
    [PName] nvarchar(50)  NOT NULL,
    [Price] decimal(18,2)  NOT NULL,
    [Detail] nvarchar(max)  NOT NULL,
    [TypeId] int  NOT NULL,
    [pic] nvarchar(max)  NULL,
    [mlNum] nchar(10)  NULL,
    [AddTime] datetime  NULL,
    [pic1] nvarchar(max)  NULL
);
GO

-- Creating table 'Type'
CREATE TABLE [dbo].[Type] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(20)  NOT NULL,
    [Description] nvarchar(20)  NOT NULL,
    [Country] nvarchar(20)  NULL,
    [NationFlag] nvarchar(max)  NULL
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
    [CartId] int IDENTITY(1,1) NOT NULL,
    [RecordId] int  NOT NULL,
    [Count] int  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [PName] nvarchar(max)  NOT NULL,
    [ProductId] int  NOT NULL,
    [User_UName] nvarchar(20)  NOT NULL
);
GO

-- Creating table 'ProductOrderDetail'
CREATE TABLE [dbo].[ProductOrderDetail] (
    [Product_Id] int  NOT NULL,
    [OrderDetail_Id] int  NOT NULL
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

-- Creating primary key on [CartId] in table 'Cart'
ALTER TABLE [dbo].[Cart]
ADD CONSTRAINT [PK_Cart]
    PRIMARY KEY CLUSTERED ([CartId] ASC);
GO

-- Creating primary key on [Product_Id], [OrderDetail_Id] in table 'ProductOrderDetail'
ALTER TABLE [dbo].[ProductOrderDetail]
ADD CONSTRAINT [PK_ProductOrderDetail]
    PRIMARY KEY CLUSTERED ([Product_Id], [OrderDetail_Id] ASC);
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

-- Creating foreign key on [Product_Id] in table 'ProductOrderDetail'
ALTER TABLE [dbo].[ProductOrderDetail]
ADD CONSTRAINT [FK_ProductOrderDetail_Product]
    FOREIGN KEY ([Product_Id])
    REFERENCES [dbo].[Product]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [OrderDetail_Id] in table 'ProductOrderDetail'
ALTER TABLE [dbo].[ProductOrderDetail]
ADD CONSTRAINT [FK_ProductOrderDetail_OrderDetail]
    FOREIGN KEY ([OrderDetail_Id])
    REFERENCES [dbo].[OrderDetail]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductOrderDetail_OrderDetail'
CREATE INDEX [IX_FK_ProductOrderDetail_OrderDetail]
ON [dbo].[ProductOrderDetail]
    ([OrderDetail_Id]);
GO

-- Creating foreign key on [User_UName] in table 'Cart'
ALTER TABLE [dbo].[Cart]
ADD CONSTRAINT [FK_CartUser]
    FOREIGN KEY ([User_UName])
    REFERENCES [dbo].[User]
        ([UName])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_CartUser'
CREATE INDEX [IX_FK_CartUser]
ON [dbo].[Cart]
    ([User_UName]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------