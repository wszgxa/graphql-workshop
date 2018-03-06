
## GraphQl

### RESTful

REST 的全称是：Representational State Transfer （表现状态转换）

加上主语
Resources Representational State Transfer （资源的表现状态转换）


1. Resources：面向资源的
2. Representational：我的理解：资源的表现形式（比较抽象可以理解成资源的类型之类的吧）
3. 状态转换就是通过种种请求进行状态的转换

``` http
Get /user/1
POST /account/1
```

``` http
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8

Content-Type:text/html
```


### RESTful的问题

1. API提供者与消费者耦合
2. API定义没有明确的规范
3. 冗余数据
4. 多次请求数据

我们假设请求一个用户的文章
REST
![](http://7fvhwe.com1.z0.glb.clouddn.com/VIWd5I5.png)


GraphQl
![](http://7fvhwe.com1.z0.glb.clouddn.com/uY50GHz.png)


 
你可以很明显的发现，在请求数据的时候GraphQl多做了一件事

![](http://7fvhwe.com1.z0.glb.clouddn.com/organize-data.jpeg)




### GraphQl 对上面问题的解决
1. 定义Schema接口解耦
2. 通过规则规范API
	2.1 前后端都可访问Schema
	2.2 定义类型，固定数据结构
3. 定义数据关系
4. 只需要一次请求就能拿到所有数据

### 理解GraphQl

#### server 端
```
type User @model {
  id: ID! @isUnique
  name: String
  dateOfBirth: DateTime!
  address: String
  post: Post @relation(name: "UsersPosts")
  comment: Comment @relation(name: "UsersComments")
}
```

Schemas and Types
![](http://7fvhwe.com1.z0.glb.clouddn.com/GraphQl_type.jpeg)

* Interfaces type
```
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```
* Union type
```
union SearchResult = Human | Droid | Starship

{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

Server
![](http://7fvhwe.com1.z0.glb.clouddn.com/server.jpeg)

#### Client 端 
Query stirng
![](http://7fvhwe.com1.z0.glb.clouddn.com/queries&mutations.jpeg)

* field
```
query {
  allUsers {
    id
  }
}
```
* Arguments
```
query {
  User(id: "cjc6eauvp9gxj0141h4kc2a3e") {
    id,
    name
  }
}
```
* Aliases
``` 
query {
  handsomeUser: User(id: "cjc6eauvp9gxj0141h4kc2a3e") {
    id,
    name
  }
}
```
* Fragments
```
{
  handsomeUer: allUsers {
    ...user
  }
}

fragment user on User {
  name
  post {
    id
  }
}
```

* Operation name
```
query getHandsomeUser {
  User(id: "cjc6eauvp9gxj0141h4kc2a3e") {
    id
    name
  }
}
```
* Variables
```
query GetHandsomeUser($userId: ID!) {
  User(id: $userId) {
    id
    name
  }
}
{
  "userId": "cjc6eauvp9gxj0141h4kc2a3e"
}
```
* Default variables

* Directives
```
{
  allUsers{
    id
    post @include(if: false) {
      id
    }
  }
}

@include(if: Boolean) Only include this field in the result if the argument is true.
@skip(if: Boolean) Skip this field if the argument is true.

```

Mutations

```
mutation {
 createUser(name: "") 
}
```

Inline Fragments & Meta fields 
自己下去看吧。



### 栗子
``` js
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://q80vw8qjp.lp.gql.zone/graphql' }),
  cache: new InMemoryCache()
});

client.query({ query: gql`{ hello }` }).then(console.log);
```


