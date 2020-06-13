const db = require("../db/connection")
const Post = require("../models/post")

db.on("error", console.error.bind(console, "MongoDB connect error:"))

const body = async () => {
  const posts =
    [
      {

        "title": "Mountain One ",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "img": "https://images.unsplash.com/photo-1516372048654-2e06f99e1382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      },
      {

        "title": "Mountain Two",
        "content": "Vestibulum venenatis dui sit amet arcu vehicula volutpat nec et diam. Phasellus non vestibulum lacus, ut vestibulum diam",
        "img": "https://images.unsplash.com/photo-1557685888-2d3621ddf615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      },

      {
        "title": "Mountain Three",
        "content": "eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "img": "https://images.unsplash.com/photo-1527618956224-702fcb42217b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      },
    ]
    await Post.insertMany(posts)
    console.log("Created Mountain Objectives!")
}
const run = async () => {
  await body()
  db.close()
}

run()