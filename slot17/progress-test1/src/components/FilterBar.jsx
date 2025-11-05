import React, { useMemo, useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = ({ onFilter }) => {
  const { payments } = usePayment();
  const [search, setSearch] = useState('');
  const [semesterSel, setSemesterSel] = useState('');
  const [courseSel, setCourseSel] = useState('');
  const [sortSel, setSortSel] = useState('');

  // derive unique semesters and courses
  const semesters = useMemo(() => {
    if (!payments) return [];
    return Array.from(new Set(payments.map((p) => p.semester).filter(Boolean)));
  }, [payments]);

  const courses = useMemo(() => {
    if (!payments) return [];
    return Array.from(new Set(payments.map((p) => (p.courseName ?? p.course)).filter(Boolean)));
  }, [payments]);

  // auto-apply filters whenever inputs change
  const applyFilters = (overrides = {}) => {
    if (!onFilter) return;
    onFilter({
      search: (overrides.search ?? search).trim(),
      semester: overrides.semester ?? semesterSel,
      course: overrides.course ?? courseSel,
      sort: overrides.sort ?? sortSel,
    });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  value={search}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearch(v);
                    applyFilters({ search: v });
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select value={semesterSel} onChange={(e) => { setSemesterSel(e.target.value); applyFilters({ semester: e.target.value }); }}>
                  <option value="">All Semesters</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select value={courseSel} onChange={(e) => { setCourseSel(e.target.value); applyFilters({ course: e.target.value }); }}>
                  <option value="">All Courses</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4} className="d-flex align-items-end">
              <div style={{ width: '100%' }}>
                <Form.Group className="mb-0">
                  <Form.Label>Sắp xếp theo:</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Select value={sortSel} onChange={(e) => { setSortSel(e.target.value); applyFilters({ sort: e.target.value }); }}>
                      <option value="">Default</option>
                      <option value="course_asc">Course name ascending</option>
                      <option value="course_desc">Course name descending</option>
                      <option value="date_asc">Date ascending</option>
                      <option value="date_desc">Date descending</option>
                      <option value="amount_asc">Amount ascending</option>
                      <option value="amount_desc">Amount descending</option>
                    </Form.Select>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSearch('');
                        setSemesterSel('');
                        setCourseSel('');
                        setSortSel('');
                        applyFilters({ search: '', semester: '', course: '', sort: '' });
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
