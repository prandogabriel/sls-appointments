.PHONY: create-appointment delete-appointment get-user-appointments get-user-appointment-info update-user-appointment

API_URL=http://localhost:3000/dev
USER_ID=test-user
APPOINTMENT_ID=test-appointment

create-appointment:
	curl -X POST "$(API_URL)/users/$(USER_ID)/appointments" \
	-H "Content-Type: application/json" \
	-d "{ \
		\"doctorId\": \"doctor-123\", \
		\"date\": \"2025-01-01T10:00:00Z\", \
		\"reminderTime\": 60 \
	}"


delete-appointment:
	curl -X DELETE "$(API_URL)/appointments/$(APPOINTMENT_ID)"

get-user-appointments:
	curl -X GET "$(API_URL)/users/$(USER_ID)/appointments"

get-user-appointment-info:
	curl -X GET "$(API_URL)/users/$(USER_ID)/appointments/$(APPOINTMENT_ID)"

update-user-appointment:
	curl -X PUT "$(API_URL)/users/$(USER_ID)/appointments/$(APPOINTMENT_ID)" \
	-H "Content-Type: application/json" \
	-d '{
		"date": "2025-01-02T12:00:00Z",
		"reminderTime": 30,
		"status": "DONE"
	}'