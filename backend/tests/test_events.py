def test_list_events_returns_events(client, seed_data):
    resp = client.get("/events")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert "title" in data[0]

def test_filter_events_by_category(client, seed_data):
    resp = client.get("/events", params={"category": "Career"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    assert data[0]["category"] == "Career"

def test_search_events_by_title(client, seed_data):
    resp = client.get("/events", params={"search": "Career"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    assert "Career" in data[0]["title"]

def test_get_event_by_id(client, seed_data):
    event_id = seed_data["events"][0].id
    resp = client.get(f"/events/{event_id}")
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == event_id

def test_get_event_by_id_not_found(client):
    resp = client.get("/events/999999")
    assert resp.status_code == 404
