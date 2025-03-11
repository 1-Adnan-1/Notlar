import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import {
  Badge,
  Button,
  Col,
  Container,
  Row,
  Stack,
  Card,
} from "react-bootstrap";
import Markdown from "react-markdown";

type Props = {
  deleteNote: (id: string) => void;
};

const Detail = ({ deleteNote }: Props) => {
  const note = useOutletContext<Note>();

  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#1f1f1f" }}>
      <Row className="mb-4">
        <Col>
          <h1 className="text-white mb-3" style={{ fontWeight: "600" }}>
            {note.title}
          </h1>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {note.tags.map((tag) => (
              <Badge
                key={tag.label}
                className="fs-6 text-white"
                style={{ borderRadius: "10px", padding: "6px 12px" }}
              >
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
      </Row>

      {/* İçerik Kartı */}
      <Card
        className="border-0 shadow-lg rounded-3 mb-5"
        style={{
          backgroundColor: "#2d2d2d",
          color: "#f0f0f0",
          padding: "2rem",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <Card.Body style={{ fontSize: "1.1rem" }}>
          <Markdown>{note.markdown}</Markdown>
        </Card.Body>
      </Card>

      {/* Butonlar */}
      <Row className="justify-content-center">
        <Col xs="auto" className="d-flex gap-3 justify-content-center">
          <Link to={".."}>
            <Button variant="outline-light">Geri</Button>
          </Link>
          <Link to={"edit"}>
            <Button variant="outline-warning">Düzenle</Button>
          </Link>
          <Button onClick={() => deleteNote(note.id)} variant="outline-danger">
            Sil
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
