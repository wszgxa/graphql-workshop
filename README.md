# server端
## 1. 创建一个server
```
  npm i -g graphcool
  graphcool init server
```

## 2. 定义schema 写一个resolver
模仿helo world,写一个resolver随机展示下列名言：
- 真理惟一可靠的标准就是永远自相符合。 —— 欧文
- 世界上一成不变的东西，只有“任何事物都是在不断变化的”这条真理。 —— 斯里兰卡
- 相信谎言的人必将在真理之前毁灭。 —— 赫尔巴特
- 一件事实是一条没有性别的真理。 —— 纪伯伦
- 不用相当的独立功夫，不论在哪个严重的问题上都不能找出真理；谁怕用功夫，谁就无法找到真理。 —— 列宁

# client端
预备schema
``` s
type Post @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String!
  postedBy: User @relation(name: "UsersPosts")
}

type User @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String @isUnique
  password: String
  posts: [Post!]! @relation(name: "UsersPosts")
}

```

## 1. 展示列表
### 1. 先创建个用户
  使用graphiql 创建一个用户，并记录下用户的id
  ```
  mutation {
    createUser(name: "guoxu", dateOfBirth: "2017-01-12") {
      id
    }
  }
  ```
### 2. 然后用这个用户去创建post
  使用上一个用户，创建3个post：
  1. title: 道德经·第一章
   content: 道可道，非常道；名可名，非常名。无名，万物之始，有名，万物之母。故常无欲，以观其妙，常有欲，以观其徼。此两者，同出而异名，同谓之玄，玄之又玄，众妙之门。
  2. title: 道德经·第二章
   content: 天下皆知美之为美，斯恶已，皆知善之为善，斯不善已。故有无相生，难易相成，长短相形，高下相倾，音声相和，前后相随。是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。夫惟弗居，是以不去。
  3. title: 道德经·第三章
   content: 不尚贤，使民不争；不贵难得之货，使民不为盗；不见可欲，使民心不乱。是以圣人之治，虚其心，实其腹，弱其志，强其骨，常使民无知无欲。使夫知者不敢为也。为无为，则无不治

  ```
  mutation {
    createPost(
      title: "道德经·第三章",
      content: "天下皆知美之为美，斯恶已，皆知善之为善，斯不善已。故有无相生，难易相成，长短相形，高下相倾，音声相和，前后相随。是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。夫惟弗居，是以不去。",
      postedById: "cjd8jptcci9c60156pl52ruag"
    ) {
      id
      createdAt
    }
  }
  ```
### 3. 展现数据
  ```
  query {
    allPosts {
      id
      title
      content
    }
  }
  ```

## 2. 创建用户,用户登录
1. another functions
```
graphcool add-template graphcool/templates/auth/email-password
graphcool deploy 
```

2. mutation gql example:
``` js
const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(
      email: $email,
      password: $password
    ) {
      id
      token
    }
  }
`
```

## 3. 发布POST
mutataion to create a post
``` js
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $content: String!, $postedById: ID!) {
    createPost(
      title: $title,
      content: $content,
      postedById: $postedById
    ) {
      id
      createdAt
      title
      postedBy {
        id
      }
    }
  }
`
```
