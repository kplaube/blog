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


@freezer.register_generator
def index():
    for page_number in range(2, len(list(pages)) + 1):
        yield {"page_number": page_number}


@freezer.register_generator
def tag():
    tags = set()

    for page in pages:
        if "tags" not in page.meta:
            continue

        for tag_entry in page.meta["tags"]:
            tags.add(tag_entry)

    for tag_entry in tags:
        yield {"slug": tag_entry}


if __name__ == "__main__":
    freezer.freeze()
