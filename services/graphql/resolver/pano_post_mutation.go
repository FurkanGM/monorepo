package resolver

import (
	"context"
	pano_api "go.kamp.us/protos/pano-api"
	"go.kamp.us/services/graphql/clients"
)

type CreatePanoPostInput struct {
	Title   string
	URL     string
	Content *string
	UserID  string
}

type CreatePanoPostArgs struct {
	Input *CreatePanoPostInput
}

type PanoMutationResolver struct {
	Clients *clients.Clients
}

func NewCreatePanoPostMutationResolver(ctx context.Context, clients *clients.Clients, args *CreatePanoPostArgs) (*PanoPostResolver, error) {
	createdPost, err := clients.PanoAPI.CreatePost(ctx, &pano_api.CreatePostRequest{
		Title:   args.Input.Title,
		Url:     args.Input.URL,
		Content: *args.Input.Content,
		UserId:  args.Input.UserID,
	})

	if err != nil {
		return nil, err
	}

	return &PanoPostResolver{post: createdPost.Post}, nil
}
