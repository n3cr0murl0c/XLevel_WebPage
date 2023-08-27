import graphene

import store.schema
import usuarios.schema

import graphql_jwt

class Query(store.schema.Query, graphene.ObjectType):
    pass


class Mutation(usuarios.schema.Mutation, store.schema.Mutation, graphene.ObjectType,):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)