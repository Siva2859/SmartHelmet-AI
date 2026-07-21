def analyze_detections(detections):
    """
    Analyze YOLO detections and generate a safety report.
    """

    report = {
        "total_workers": 0,
        "helmet_count": 0,
        "no_helmet_count": 0,
        "vest_count": 0,
        "no_vest_count": 0,
        "violations": 0,
        "safety_score": 0
    }

    for detection in detections:

        label = detection["class"]

        if label == "Person":
            report["total_workers"] += 1

        elif label == "Hardhat":
            report["helmet_count"] += 1

        elif label == "NO-Hardhat":
            report["no_helmet_count"] += 1

        elif label == "Safety Vest":
            report["vest_count"] += 1

        elif label == "NO-Safety Vest":
            report["no_vest_count"] += 1

    report["violations"] = (
        report["no_helmet_count"] +
        report["no_vest_count"]
    )

    if report["total_workers"] > 0:

        compliant = (
            report["helmet_count"] +
            report["vest_count"]
        )

        report["safety_score"] = round(
            (compliant / (report["total_workers"] * 2)) * 100,
            2
        )

    return report