from flask_frozen import Freezer
from app import app, pages

freezer = Freezer(app)


@freezer.register_generator
def blog_post():
    for page in pages:
        if "date" in page.meta and "slug" in page.meta:
            post_publication_date = page.meta["date"]

            yield {
                "year": post_publication_date.year,
                "month": post_publication_date.month,
                "day": post_publication_date.day,
                "slug": page.meta["slug"],
            }


if __name__ == "__main__":
    freezer.freeze()
