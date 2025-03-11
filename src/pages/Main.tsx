import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card/index";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";

type Props = {
  availableTags: Tag[];
  notes: Note[];
};

const Main = ({ availableTags, notes }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filtredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) &&
          selectedTags.every((s_tag) =>
            note.tags.some((note_tag) => note_tag.value === s_tag.value)
          )
      ),
    [query, selectedTags]
  );

  return (
    <Container className="mx-auto py-5">
      {/* Üst Kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4 ">
        <div className="d-flex align-items-center">
          <img width={65} height={55} src="/not.png" alt="note-logo" />
          <h1 className="mt-2" style={{ color: "#18C2F4" }}>
            NOTLAR
          </h1>
        </div>

        <Link to="/new">
          <Button variant="outline-info">Oluştur</Button>
        </Link>
      </Stack>

      {/* Form */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="custom-label">Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setQuery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="custom-label">Etikete Göre Ara</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Liste*/}
      <Row xs={1} sm={2} lg={2} xl={2} className="mt-4 g-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;
