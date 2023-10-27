import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, List, Button, Segment, Select } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useReviewsQuery } from "../../hooks/api/reviews/useReviewsQuery";

const options = [
  { key: 5, text: "5", value: 5 },
  { key: 10, text: "10", value: 10 },
  { key: 20, text: "20", value: 20 },
  { key: 30, text: "30", value: 30 },
  { key: 50, text: "50", value: 50 },
  { key: 100, text: "100", value: 100 },
];

export default function ReviewDashboard() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const reviewsQuery = useReviewsQuery(page, pageSize);
  const [viewAsList, setViewAsList] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e, { value }) => {
    setPageSize(value);
  };

  if (reviewsQuery.isLoading) {
    return <LoadingComponent content={t("loading")} />;
  }

  return (
    <div>
      <Segment>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>{t("limit")}:</p>
        <Select
          className="pagination-select-list"
          options={options}
          value={pageSize}
          onChange={handleChange}
          label="Items per page"
          labelPosition="right"
        />
      </Segment>
      <Segment className="pagination_Container_Style">
        <div>
          <Button
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
            className="pagination-Button-Style"
          >
            {t("previous")}
          </Button>
          <span>
            {t("page")} {page}
          </span>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={reviewsQuery.data?.reviews.length < pageSize}
            className="pagination-Button-Style"
          >
            {t("next")}
          </Button>
        </div>
      </Segment>
      <Card.Group>
        {reviewsQuery.data?.reviews.map((review) => (
          <Card key={review._id}>
            <Card.Content>
              <Card.Header>{t("reviews")}</Card.Header>
              <Card.Meta>
                {t("rating")}: {review.rating}
              </Card.Meta>
              <Card.Description>
                {t("comment")}: {review.comment}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
