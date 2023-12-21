package ctx

import (
	"context"
	"reflect"
)

// CtxWith returns a new context.Context with the value *T stored in it.
func With[T any](parent context.Context, v *T) context.Context {
	return context.WithValue(parent, reflect.TypeOf((*T)(nil)), v)
}

// CtxValue returns the value *T stored in the context.Context, or nil if not stored.
func Value[T any](ctx context.Context) *T {
	v, ok := ctx.Value(reflect.TypeOf((*T)(nil))).(*T)
	if !ok {
		return nil
	}
	return v
}
