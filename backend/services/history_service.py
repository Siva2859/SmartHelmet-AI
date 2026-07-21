import sqlite3

DATABASE = "smarthelmet.db"


def save_history(
    filename,
    prediction_image,
    workers,
    helmets,
    vests,
    violations,
    safety_score
):

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO detection_history(

            filename,
            prediction_image,
            workers,
            helmets,
            vests,
            violations,
            safety_score

        )

        VALUES(?,?,?,?,?,?,?)

    """, (

        filename,
        prediction_image,
        workers,
        helmets,
        vests,
        violations,
        safety_score

    ))

    conn.commit()

    conn.close()