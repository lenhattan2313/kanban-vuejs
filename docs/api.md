# API Documentation

This guide covers the API design, endpoints, data structures, and integration patterns for the Vue.js Kanban project.

## 🌐 API Overview

### API Philosophy

- **RESTful Design**: Follow REST principles for API design
- **JSON Format**: Use JSON for data exchange
- **Stateless**: Stateless API design for scalability
- **Versioning**: API versioning for backward compatibility

### API Architecture

The API follows a layered architecture:

- **Presentation Layer**: HTTP request/response handling
- **Business Logic Layer**: Application logic and validation
- **Data Access Layer**: Database operations and data persistence
- **Integration Layer**: External service integration

## 📋 API Endpoints

### Authentication Endpoints

#### User Authentication

- **POST /api/auth/login**: User login
- **POST /api/auth/logout**: User logout
- **POST /api/auth/register**: User registration
- **POST /api/auth/refresh**: Token refresh
- **GET /api/auth/profile**: Get user profile

#### OAuth Integration

- **GET /api/auth/oauth/{provider}**: OAuth provider authentication
- **POST /api/auth/oauth/callback**: OAuth callback handling
- **GET /api/auth/oauth/providers**: Available OAuth providers

### Board Management Endpoints

#### Board Operations

- **GET /api/boards**: List all boards
- **POST /api/boards**: Create new board
- **GET /api/boards/{id}**: Get board details
- **PUT /api/boards/{id}**: Update board
- **DELETE /api/boards/{id}**: Delete board
- **GET /api/boards/{id}/columns**: Get board columns

#### Board Sharing

- **POST /api/boards/{id}/share**: Share board
- **GET /api/boards/{id}/members**: Get board members
- **PUT /api/boards/{id}/members/{userId}**: Update member permissions
- **DELETE /api/boards/{id}/members/{userId}**: Remove member

### Column Management Endpoints

#### Column Operations

- **POST /api/boards/{boardId}/columns**: Create column
- **GET /api/columns/{id}**: Get column details
- **PUT /api/columns/{id}**: Update column
- **DELETE /api/columns/{id}**: Delete column
- **PUT /api/columns/{id}/position**: Update column position

#### Column Settings

- **PUT /api/columns/{id}/settings**: Update column settings
- **GET /api/columns/{id}/settings**: Get column settings
- **POST /api/columns/{id}/rules**: Add column rules
- **DELETE /api/columns/{id}/rules/{ruleId}**: Remove column rule

### Card Management Endpoints

#### Card Operations

- **POST /api/columns/{columnId}/cards**: Create card
- **GET /api/cards/{id}**: Get card details
- **PUT /api/cards/{id}**: Update card
- **DELETE /api/cards/{id}**: Delete card
- **PUT /api/cards/{id}/position**: Update card position
- **PUT /api/cards/{id}/move**: Move card between columns

#### Card Content

- **POST /api/cards/{id}/attachments**: Upload attachment
- **DELETE /api/cards/{id}/attachments/{attachmentId}**: Remove attachment
- **POST /api/cards/{id}/comments**: Add comment
- **PUT /api/cards/{id}/comments/{commentId}**: Update comment
- **DELETE /api/cards/{id}/comments/{commentId}**: Delete comment

### User Management Endpoints

#### User Operations

- **GET /api/users/profile**: Get user profile
- **PUT /api/users/profile**: Update user profile
- **PUT /api/users/password**: Change password
- **POST /api/users/avatar**: Upload avatar
- **DELETE /api/users/avatar**: Remove avatar

#### User Preferences

- **GET /api/users/preferences**: Get user preferences
- **PUT /api/users/preferences**: Update user preferences
- **GET /api/users/notifications**: Get notification settings
- **PUT /api/users/notifications**: Update notification settings

## 📊 Data Structures

### Authentication Data

#### User Object

- **id**: Unique user identifier
- **email**: User email address
- **name**: User display name
- **avatar**: User avatar URL
- **createdAt**: Account creation timestamp
- **updatedAt**: Last update timestamp

#### Authentication Response

- **accessToken**: JWT access token
- **refreshToken**: JWT refresh token
- **expiresIn**: Token expiration time
- **user**: User object

### Board Data

#### Board Object

- **id**: Unique board identifier
- **title**: Board title
- **description**: Board description
- **ownerId**: Board owner user ID
- **isPublic**: Public board flag
- **settings**: Board settings object
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

#### Board Settings

- **theme**: Board theme configuration
- **permissions**: Board permission settings
- **notifications**: Notification preferences
- **features**: Enabled board features

### Column Data

#### Column Object

- **id**: Unique column identifier
- **boardId**: Parent board ID
- **title**: Column title
- **description**: Column description
- **position**: Column position
- **settings**: Column settings
- **rules**: Column automation rules
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

#### Column Settings

- **maxCards**: Maximum cards allowed
- **color**: Column color theme
- **autoArchive**: Auto-archive settings
- **notifications**: Column notification settings

### Card Data

#### Card Object

- **id**: Unique card identifier
- **columnId**: Parent column ID
- **title**: Card title
- **description**: Card description
- **priority**: Card priority level
- **assigneeId**: Assigned user ID
- **dueDate**: Due date timestamp
- **tags**: Card tags array
- **attachments**: Card attachments
- **comments**: Card comments
- **position**: Card position
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

#### Card Priority

- **low**: Low priority
- **medium**: Medium priority
- **high**: High priority
- **urgent**: Urgent priority

#### Card Attachment

- **id**: Attachment identifier
- **filename**: Original filename
- **url**: File URL
- **size**: File size in bytes
- **type**: File MIME type
- **uploadedBy**: Uploader user ID
- **uploadedAt**: Upload timestamp

#### Card Comment

- **id**: Comment identifier
- **content**: Comment text content
- **authorId**: Comment author user ID
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

## 🔄 API Patterns

### Request/Response Patterns

#### Standard Response Format

- **success**: Boolean indicating success
- **data**: Response data object
- **message**: Response message
- **errors**: Array of error objects
- **meta**: Metadata object (pagination, etc.)

#### Error Response Format

- **success**: false
- **message**: Error message
- **errors**: Array of detailed error objects
- **code**: Error code
- **timestamp**: Error timestamp

### Pagination

#### Pagination Parameters

- **page**: Page number (default: 1)
- **limit**: Items per page (default: 20, max: 100)
- **sort**: Sort field
- **order**: Sort order (asc/desc)

#### Pagination Response

- **data**: Array of items
- **meta**: Pagination metadata
  - **page**: Current page
  - **limit**: Items per page
  - **total**: Total items
  - **pages**: Total pages
  - **hasNext**: Has next page
  - **hasPrev**: Has previous page

### Filtering and Search

#### Filter Parameters

- **search**: Text search query
- **filters**: Object with filter criteria
- **dateRange**: Date range filter
- **status**: Status filter
- **assignee**: Assignee filter

#### Search Response

- **data**: Filtered items
- **meta**: Search metadata
  - **query**: Search query
  - **filters**: Applied filters
  - **total**: Total matching items

## 🔒 Security and Authentication

### Authentication Methods

#### JWT Authentication

- **Access Token**: Short-lived JWT token
- **Refresh Token**: Long-lived refresh token
- **Token Rotation**: Automatic token refresh
- **Token Revocation**: Token invalidation

#### OAuth Integration

- **Google OAuth**: Google account integration
- **GitHub OAuth**: GitHub account integration
- **Microsoft OAuth**: Microsoft account integration
- **Custom OAuth**: Custom OAuth providers

### Authorization

#### Role-Based Access Control

- **Owner**: Full board access
- **Admin**: Administrative access
- **Editor**: Edit access
- **Viewer**: Read-only access
- **Guest**: Limited access

#### Permission Levels

- **Board Level**: Board-wide permissions
- **Column Level**: Column-specific permissions
- **Card Level**: Card-specific permissions
- **User Level**: User-specific permissions

## 📡 Real-time Features

### WebSocket Integration

#### WebSocket Events

- **card.created**: New card created
- **card.updated**: Card updated
- **card.moved**: Card moved between columns
- **card.deleted**: Card deleted
- **comment.added**: New comment added
- **user.joined**: User joined board
- **user.left**: User left board

#### WebSocket Connection

- **Connection URL**: WebSocket endpoint
- **Authentication**: JWT token authentication
- **Reconnection**: Automatic reconnection
- **Heartbeat**: Connection heartbeat

### Real-time Updates

#### Update Types

- **Live Updates**: Real-time data synchronization
- **Collaborative Editing**: Multi-user editing
- **Presence Indicators**: User online status
- **Activity Feed**: Real-time activity updates

## 📊 API Monitoring

### Performance Metrics

#### Response Times

- **Average Response Time**: Mean response time
- **95th Percentile**: 95th percentile response time
- **99th Percentile**: 99th percentile response time
- **Timeout Rate**: Request timeout percentage

#### Throughput

- **Requests Per Second**: API request rate
- **Concurrent Users**: Simultaneous users
- **Error Rate**: Error percentage
- **Success Rate**: Success percentage

### API Analytics

#### Usage Analytics

- **Endpoint Usage**: Most used endpoints
- **User Activity**: User interaction patterns
- **Peak Times**: High usage periods
- **Geographic Distribution**: User locations

#### Error Analytics

- **Error Types**: Common error types
- **Error Frequency**: Error occurrence patterns
- **Error Impact**: Error impact on users
- **Error Resolution**: Error resolution time

## 🔄 API Versioning

### Versioning Strategy

#### URL Versioning

- **Version in URL**: /api/v1/boards
- **Backward Compatibility**: Support multiple versions
- **Deprecation Policy**: Clear deprecation timeline
- **Migration Guide**: Version migration documentation

#### Header Versioning

- **Accept Header**: Version in Accept header
- **Custom Header**: Custom version header
- **Default Version**: Default version fallback
- **Version Discovery**: API version discovery

### Version Management

#### Version Lifecycle

- **Development**: New version development
- **Beta**: Beta testing phase
- **Stable**: Stable production version
- **Deprecated**: Deprecated version
- **Retired**: Retired version

#### Migration Support

- **Migration Tools**: Automated migration tools
- **Documentation**: Migration documentation
- **Support**: Migration support
- **Rollback**: Migration rollback procedures

This API documentation provides comprehensive information about the API design, endpoints, and data structures for the Vue.js Kanban application. Follow these patterns to ensure consistent and reliable API integration.
