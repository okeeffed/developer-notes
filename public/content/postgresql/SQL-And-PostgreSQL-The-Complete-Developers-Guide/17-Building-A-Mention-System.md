# 17: Building A Mention System

## Adding Captions and Locations

These are just more columns that we would be adding to our `posts` table.

The `lat` and `lng` was designated as a `REAL` number.

## Photo Mentions vs Caption Mentions

For photo mentions, it is mapped that a `tags` table will map a user to a post.

Something that had to be done in this section is to calculate the XY distance for where the tag popover is made.

Some questions that you need to thing about with the modeling of comment mentions:

- Do we need the data required for user analytics?
- Do we need to notify the user when they are mentioned and be able to link the comment?

In terms of the table model, we have a couple of options:

1. Nullish values for the XY co-ordinates if the tag is a caption as opposed to a photo.
2. Separate tables for photo and caption mentions. This would lead to the table `photo_tags` and `caption_tags`.
