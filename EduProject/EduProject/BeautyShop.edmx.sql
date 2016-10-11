
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/11/2016 15:06:28
-- Generated from EDMX file: F:\MySpace\biyesheji\EduProject\EduProject\BeautyShop.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [BeautyShop];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_UserOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_UserOrder];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductOrder_Order]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductOrder] DROP CONSTRAINT [FK_ProductOrder_Order];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductOrder_Product]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductOrder] DROP CONSTRAINT [FK_ProductOrder_Product];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Log]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Log];
GO
IF OBJECT_ID(N'[dbo].[Order]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Order];
GO
IF OBJECT_ID(N'[dbo].[Product]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Product];
GO
IF OBJECT_ID(N'[dbo].[UserInfo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserInfo];
GO
IF OBJECT_ID(N'[dbo].[ProductOrder]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductOrder];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Log'
CREATE TABLE [dbo].[Log] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Content] nvarchar(max)  NOT NULL,
    [CreateTime] datetime  NOT NULL
);
GO

-- Creating table 'Order'
CREATE TABLE [dbo].[Order] (
    [OrderId] int IDENTITY(1,1) NOT NULL,
    [OrderName] nvarchar(max)  NOT NULL,
    [OrderTime] time  NOT NULL,
    [Address] nvarchar(max)  NOT NULL,
    [UserId] int  NOT NULL,
    [OrderDetail] nvarchar(max)  NULL
);
GO

-- Creating table 'Product'
CREATE TABLE [dbo].[Product] (
    [ProductId] int IDENTITY(1,1) NOT NULL,
    [ProductName] nvarchar(max)  NOT NULL,
    [ProductType] nvarchar(max)  NOT NULL,
    [Price] decimal(18,0)  NOT NULL,
    [ProdutStatus] nvarchar(max)  NOT NULL,
    [ProductDetail] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'UserInfo'
CREATE TABLE [dbo].[UserInfo] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserName] nvarchar(max)  NOT NULL,
    [PassWord] nvarchar(max)  NOT NULL,
    [UserType] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [Address] nvarchar(max)  NOT NULL,
    [Phone] nvarchar(max)  NOT NULL,
    [Age] nchar(10)  NULL,
    [Sex] nchar(10)  NULL
);
GO

-- Creating table 'ProductOrder'
CREATE TABLE [dbo].[ProductOrder] (
    [Order_OrderId] int  NOT NULL,
    [Product_ProductId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Log'
ALTER TABLE [dbo].[Log]
ADD CONSTRAINT [PK_Log]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [OrderId] in table 'Order'
ALTER TABLE [dbo].[Order]
ADD CONSTRAINT [PK_Order]
    PRIMARY KEY CLUSTERED ([OrderId] ASC);
GO

-- Creating primary key on [ProductId] in table 'Product'
ALTER TABLE [dbo].[Product]
ADD CONSTRAINT [PK_Product]
    PRIMARY KEY CLUSTERED ([ProductId] ASC);
GO

-- Creating primary key on [Id] in table 'UserInfo'
ALTER TABLE [dbo].[UserInfo]
ADD CONSTRAINT [PK_UserInfo]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Order_OrderId], [Product_ProductId] in table 'ProductOrder'
ALTER TABLE [dbo].[ProductOrder]
ADD CONSTRAINT [PK_ProductOrder]
    PRIMARY KEY CLUSTERED ([Order_OrderId], [Product_ProductId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserId] in table 'Order'
ALTER TABLE [dbo].[Order]
ADD CONSTRAINT [FK_UserOrder]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[UserInfo]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UserOrder'
CREATE INDEX [IX_FK_UserOrder]
ON [dbo].[Order]
    ([UserId]);
GO

-- Creating foreign key on [Order_OrderId] in table 'ProductOrder'
ALTER TABLE [dbo].[ProductOrder]
ADD CONSTRAINT [FK_ProductOrder_Order]
    FOREIGN KEY ([Order_OrderId])
    REFERENCES [dbo].[Order]
        ([OrderId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Product_ProductId] in table 'ProductOrder'
ALTER TABLE [dbo].[ProductOrder]
ADD CONSTRAINT [FK_ProductOrder_Product]
    FOREIGN KEY ([Product_ProductId])
    REFERENCES [dbo].[Product]
        ([ProductId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductOrder_Product'
CREATE INDEX [IX_FK_ProductOrder_Product]
ON [dbo].[ProductOrder]
    ([Product_ProductId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------