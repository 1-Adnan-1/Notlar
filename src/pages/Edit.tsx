import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "../types";
import { Container, Row, Col, Card } from "react-bootstrap";
import Form from "../components/Form";

type Props = {
  handleSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Edit = ({ handleSubmit, createTag, availableTags }: Props) => {
  const note = useOutletContext<Note>();

  return (
    <Container className="py-5 mx-auto">
      {/* Başlık ve Geri Butonu */}
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2 className="fw-bold text-light">Notu Düzenle</h2>
        </Col>
      </Row>

      {/* Form */}
      <Card
        className="border-0 shadow-lg rounded-3"
        style={{
          backgroundColor: "#1F1F1F",
        }}
      >
        <Card.Body className="fs-5 text-light">
          <Form
            handleSubmit={(updatedData) => handleSubmit(note.id, updatedData)}
            createTag={createTag}
            availableTags={availableTags}
            title={note.title}
            tags={note.tags}
            markdown={note.markdown}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Edit;
