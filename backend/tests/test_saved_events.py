def test_save_event_for_user(client, seed_data):
    user_id = seed_data["user"].id
    event_id = seed_data["events"][0].id

    resp = client.post(
        f"/users/{user_id}/saved-events",
        json={"user_id": user_id, "event_id": event_id},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["user_id"] == user_id
    assert data["event_id"] == event_id

def test_list_saved_events(client, seed_data):
    user_id = seed_data["user"].id
    event_id = seed_data["events"][0].id

    # save one
    client.post(
        f"/users/{user_id}/saved-events",
        json={"user_id": user_id, "event_id": event_id},
    )

    resp = client.get(f"/users/{user_id}/saved-events")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) >= 1
