(function(global){
'use strict';
const manifest={
  "schemaVersion": "lotscope-verified-roof-intervals-v2",
  "sourceRepo": "aerovista-us/lot-assessment",
  "sourceSnapshot": "pondy-d4",
  "sourceRoofSchema": "lotscope-roof-geometry-v1",
  "renderScope": "CONCEPT_ONLY_NOT_FOR_CONSTRUCTION",
  "camera": {
    "id": "pondy-iso-01",
    "screenX": [
      5.2,
      -3.2,
      0
    ],
    "screenY": [
      -1.55,
      -1.35,
      -8.2
    ],
    "depth": [
      -26.24,
      -42.64,
      11.98
    ],
    "screenTranslation": [
      299.2,
      688.6
    ],
    "elevationAxes": "PONDY_WORLD_AXES",
    "cardinalDepthDirections": {
      "north": "NEGATIVE_Y",
      "south": "POSITIVE_Y",
      "east": "POSITIVE_X",
      "west": "NEGATIVE_X"
    }
  },
  "owners": [
    {
      "ownerId": "home-b",
      "roofId": "roof-home-b",
      "ownerGeometryKey": "{\"id\":\"home-b\",\"rotationDeg\":0,\"polygon\":[[54,5],[94.5,5],[94.5,31.25],[72.5,31.25],[72.5,22],[54,22]]}",
      "surfaceFacesKey": "[[\"home-b-roof-zone-1-side-neg-1\",[[72.5,13.5,24.25],[72.5,5,20],[83.5,13.500000000066663,24.25000000003333]]],[\"home-b-roof-zone-1-side-neg-2\",[[83.49999999991373,13.5,24.25],[72.5,5,20],[83.5,5,20]]],[\"home-b-roof-zone-1-side-neg-3\",[[94.5,13.5,24.25],[83.5,13.5,24.25],[94.5,5,20]]],[\"home-b-roof-zone-1-side-neg-4\",[[83.50000000008627,13.5,24.25],[83.5,5,20],[94.5,5,20]]],[\"home-b-roof-zone-1-side-neg-5\",[[54,5,20],[72.5,5,20],[72.5,13.5,24.25],[54,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-6\",[[72.5,22,20],[72.5,13.5,24.25],[83.5,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-7\",[[94.5,22,20],[83.5,13.499999999933337,24.25000000003333],[94.5,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-8\",[[54,13.5,24.25],[72.5,13.5,24.25],[72.5,22,20],[54,22,20]]],[\"home-b-roof-zone-2-side-neg-9\",[[83.5,22,24.25000000003333],[83.5,13.5,24.25000000003333],[94.5,22,20]]],[\"home-b-roof-zone-2-side-neg-10\",[[83.5,31.25,24.25000000003333],[83.5,22,24.25000000003333],[94.5,22,20],[94.5,31.25,20]]],[\"home-b-roof-zone-2-side-pos-11\",[[72.5,22,20],[83.49999999991373,13.5,24.25],[83.5,22,24.25000000003333]]],[\"home-b-roof-zone-2-side-pos-12\",[[72.5,22,20],[83.5,22,24.25000000003333],[83.5,31.25,24.25000000003333],[72.5,31.25,20]]]]",
      "views": {
        "north": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 8,
            "hidden": 7,
            "unresolved": 0,
            "internalSeams": 14,
            "duplicateShared": 5,
            "edgeOnFaces": 4,
            "collapsedEdges": 6
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                24.25
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -94.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -83.5,
                20
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -54,
                20
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -72.5,
                24.25
              ],
              "end": [
                -54,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -54,
                24.25
              ],
              "end": [
                -54,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -54,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -54,
                20
              ],
              "end": [
                -54,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -83.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -72.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -72.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -72.5,
                24.25
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -54,
                24.25
              ],
              "end": [
                -72.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-b-roof-zone-2-side-neg-9",
                "edgeIndex": 0,
                "point": [
                  -83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  22,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-neg-10",
                "edgeIndex": 0,
                "point": [
                  -83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  31.25,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  22,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-neg-10",
                "edgeIndex": 2,
                "point": [
                  -94.5,
                  20
                ],
                "sourceA": [
                  94.5,
                  22,
                  20
                ],
                "sourceB": [
                  94.5,
                  31.25,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-11",
                "edgeIndex": 1,
                "point": [
                  -83.49999999991373,
                  24.25
                ],
                "sourceA": [
                  83.49999999991373,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  22,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-12",
                "edgeIndex": 1,
                "point": [
                  -83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  22,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  31.25,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-12",
                "edgeIndex": 3,
                "point": [
                  -72.5,
                  20
                ],
                "sourceA": [
                  72.5,
                  31.25,
                  20
                ],
                "sourceB": [
                  72.5,
                  22,
                  20
                ]
              }
            ]
          }
        },
        "south": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 10,
            "hidden": 5,
            "unresolved": 0,
            "internalSeams": 14,
            "duplicateShared": 5,
            "edgeOnFaces": 4,
            "collapsedEdges": 6
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                24.25
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                20
              ],
              "end": [
                94.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                83.5,
                20
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                54,
                20
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                24.25
              ],
              "end": [
                54,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                54,
                24.25
              ],
              "end": [
                54,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                20
              ],
              "end": [
                54,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                54,
                20
              ],
              "end": [
                54,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                83.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                20
              ],
              "end": [
                72.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                20
              ],
              "end": [
                72.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                72.5,
                24.25
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                54,
                24.25
              ],
              "end": [
                72.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.999999999992157,
              "visibility": "INTERNAL_SEAM",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-b-roof-zone-2-side-neg-9",
                "edgeIndex": 0,
                "point": [
                  83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  22,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-neg-10",
                "edgeIndex": 0,
                "point": [
                  83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  31.25,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  22,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-neg-10",
                "edgeIndex": 2,
                "point": [
                  94.5,
                  20
                ],
                "sourceA": [
                  94.5,
                  22,
                  20
                ],
                "sourceB": [
                  94.5,
                  31.25,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-11",
                "edgeIndex": 1,
                "point": [
                  83.49999999991373,
                  24.25
                ],
                "sourceA": [
                  83.49999999991373,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  22,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-12",
                "edgeIndex": 1,
                "point": [
                  83.5,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  22,
                  24.25000000003333
                ],
                "sourceB": [
                  83.5,
                  31.25,
                  24.25000000003333
                ]
              },
              {
                "faceId": "home-b-roof-zone-2-side-pos-12",
                "edgeIndex": 3,
                "point": [
                  72.5,
                  20
                ],
                "sourceA": [
                  72.5,
                  31.25,
                  20
                ],
                "sourceB": [
                  72.5,
                  22,
                  20
                ]
              }
            ]
          }
        },
        "east": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 6,
            "hidden": 6,
            "unresolved": 0,
            "internalSeams": 14,
            "duplicateShared": 4,
            "edgeOnFaces": 8,
            "collapsedEdges": 10
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.9999999999921573,
              "visibility": "HIDDEN",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -22,
                24.25
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -31.25,
                24.25
              ],
              "end": [
                -22,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -22,
                20
              ],
              "end": [
                -31.25,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -31.25,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -31.25,
                24.25
              ],
              "end": [
                -31.25,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -22,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.9999999999921573,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -22,
                20
              ],
              "end": [
                -22,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -22,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -22,
                24.25
              ],
              "end": [
                -22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                -22,
                20
              ],
              "end": [
                -22,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -22,
                24.25
              ],
              "end": [
                -31.25,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-b-roof-zone-1-side-neg-1",
                "edgeIndex": 2,
                "point": [
                  -13.500000000066663,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  13.500000000066663,
                  24.25000000003333
                ],
                "sourceB": [
                  72.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-2",
                "edgeIndex": 1,
                "point": [
                  -5,
                  20
                ],
                "sourceA": [
                  72.5,
                  5,
                  20
                ],
                "sourceB": [
                  83.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-3",
                "edgeIndex": 0,
                "point": [
                  -13.5,
                  24.25
                ],
                "sourceA": [
                  94.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-4",
                "edgeIndex": 1,
                "point": [
                  -5,
                  20
                ],
                "sourceA": [
                  83.5,
                  5,
                  20
                ],
                "sourceB": [
                  94.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-5",
                "edgeIndex": 0,
                "point": [
                  -5,
                  20
                ],
                "sourceA": [
                  54,
                  5,
                  20
                ],
                "sourceB": [
                  72.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-5",
                "edgeIndex": 2,
                "point": [
                  -13.5,
                  24.25
                ],
                "sourceA": [
                  72.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  54,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-6",
                "edgeIndex": 1,
                "point": [
                  -13.5,
                  24.25
                ],
                "sourceA": [
                  72.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-7",
                "edgeIndex": 1,
                "point": [
                  -13.499999999933337,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  13.499999999933337,
                  24.25000000003333
                ],
                "sourceB": [
                  94.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-8",
                "edgeIndex": 0,
                "point": [
                  -13.5,
                  24.25
                ],
                "sourceA": [
                  54,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  72.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-8",
                "edgeIndex": 2,
                "point": [
                  -22,
                  20
                ],
                "sourceA": [
                  72.5,
                  22,
                  20
                ],
                "sourceB": [
                  54,
                  22,
                  20
                ]
              }
            ]
          }
        },
        "west": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 6,
            "hidden": 6,
            "unresolved": 0,
            "internalSeams": 14,
            "duplicateShared": 4,
            "edgeOnFaces": 8,
            "collapsedEdges": 10
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.9999999999921573,
              "visibility": "HIDDEN",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                22,
                24.25
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                24.25
              ],
              "end": [
                22,
                24.25
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                22,
                20
              ],
              "end": [
                31.25,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                31.25,
                20
              ],
              "end": [
                31.25,
                24.25
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                24.25
              ],
              "end": [
                31.25,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                20
              ],
              "end": [
                22,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.9999999999921573,
              "visibility": "INTERNAL_SEAM",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                22,
                20
              ],
              "end": [
                22,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                22,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                22,
                24.25
              ],
              "end": [
                22,
                20
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                22,
                20
              ],
              "end": [
                22,
                24.25
              ],
              "reason": "Adjacent world-coplanar faces: internal seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                22,
                24.25
              ],
              "end": [
                31.25,
                24.25
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-b-roof-zone-1-side-neg-1",
                "edgeIndex": 2,
                "point": [
                  13.500000000066663,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  13.500000000066663,
                  24.25000000003333
                ],
                "sourceB": [
                  72.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-2",
                "edgeIndex": 1,
                "point": [
                  5,
                  20
                ],
                "sourceA": [
                  72.5,
                  5,
                  20
                ],
                "sourceB": [
                  83.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-3",
                "edgeIndex": 0,
                "point": [
                  13.5,
                  24.25
                ],
                "sourceA": [
                  94.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-4",
                "edgeIndex": 1,
                "point": [
                  5,
                  20
                ],
                "sourceA": [
                  83.5,
                  5,
                  20
                ],
                "sourceB": [
                  94.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-5",
                "edgeIndex": 0,
                "point": [
                  5,
                  20
                ],
                "sourceA": [
                  54,
                  5,
                  20
                ],
                "sourceB": [
                  72.5,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-neg-5",
                "edgeIndex": 2,
                "point": [
                  13.5,
                  24.25
                ],
                "sourceA": [
                  72.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  54,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-6",
                "edgeIndex": 1,
                "point": [
                  13.5,
                  24.25
                ],
                "sourceA": [
                  72.5,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  83.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-7",
                "edgeIndex": 1,
                "point": [
                  13.499999999933337,
                  24.25000000003333
                ],
                "sourceA": [
                  83.5,
                  13.499999999933337,
                  24.25000000003333
                ],
                "sourceB": [
                  94.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-8",
                "edgeIndex": 0,
                "point": [
                  13.5,
                  24.25
                ],
                "sourceA": [
                  54,
                  13.5,
                  24.25
                ],
                "sourceB": [
                  72.5,
                  13.5,
                  24.25
                ]
              },
              {
                "faceId": "home-b-roof-zone-1-side-pos-8",
                "edgeIndex": 2,
                "point": [
                  22,
                  20
                ],
                "sourceA": [
                  72.5,
                  22,
                  20
                ],
                "sourceB": [
                  54,
                  22,
                  20
                ]
              }
            ]
          }
        },
        "pondy-iso-01": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 21,
            "hidden": 7,
            "unresolved": 0,
            "internalSeams": 20,
            "duplicateShared": 12,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                391,
                -346.5
              ],
              "end": [
                333.8,
                -329.45
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                361,
                -283.125
              ],
              "end": [
                418.2,
                -300.175
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.846258916375777,
              "visibility": "VISIBLE",
              "start": [
                448.2,
                -363.55
              ],
              "end": [
                399.79398998,
                -349.12128548
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "t0": 0.846258916375777,
              "t1": 0.913610779461002,
              "visibility": "VISIBLE",
              "start": [
                399.79398998,
                -349.12128548
              ],
              "end": [
                395.94146341,
                -347.97293621
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "t0": 0.913610779461002,
              "t1": 0.9999999999956983,
              "visibility": "VISIBLE",
              "start": [
                395.94146341,
                -347.97293621
              ],
              "end": [
                391,
                -346.5
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                475.4,
                -317.225
              ],
              "end": [
                448.2,
                -363.55
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                418.2,
                -300.175
              ],
              "end": [
                475.4,
                -317.225
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                264.8,
                -254.45
              ],
              "end": [
                361,
                -283.125
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.022260534457699713,
              "visibility": "VISIBLE",
              "start": [
                333.8,
                -329.45
              ],
              "end": [
                331.65853659,
                -328.81167917
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "t0": 0.022260534457699713,
              "t1": 0.5031809773045163,
              "visibility": "VISIBLE",
              "start": [
                331.65853659,
                -328.81167917
              ],
              "end": [
                285.39398998,
                -315.02128548
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "t0": 0.5031809773045163,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                285.39398998,
                -315.02128548
              ],
              "end": [
                237.6,
                -300.775
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 0.28048048048048035,
              "visibility": "VISIBLE",
              "start": [
                237.6,
                -300.775
              ],
              "end": [
                245.22906907,
                -287.78174174
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "t0": 0.28048048048048035,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                245.22906907,
                -287.78174174
              ],
              "end": [
                264.8,
                -254.45
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.6215427427291547,
              "visibility": "HIDDEN",
              "start": [
                391,
                -346.5
              ],
              "end": [
                338.54179251,
                -321.37413463
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "t0": 0.6215427427291547,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                338.54179251,
                -321.37413463
              ],
              "end": [
                306.6,
                -306.075
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                421,
                -340.175
              ],
              "end": [
                391,
                -346.5
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                448.2,
                -363.55
              ],
              "end": [
                421,
                -340.175
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.6379514649784919,
              "visibility": "HIDDEN",
              "start": [
                306.6,
                -306.075
              ],
              "end": [
                245.22906907,
                -287.78174174
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "t0": 0.6379514649784919,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                245.22906907,
                -287.78174174
              ],
              "end": [
                210.4,
                -277.4
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                210.4,
                -277.4
              ],
              "end": [
                237.6,
                -300.775
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.9999999999913577,
              "visibility": "VISIBLE",
              "start": [
                363.8,
                -357.975
              ],
              "end": [
                391,
                -346.5
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                334.2,
                -370.4625
              ],
              "end": [
                363.8,
                -357.975
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.716419257320759,
              "visibility": "HIDDEN",
              "start": [
                421,
                -340.175
              ],
              "end": [
                399.79398998,
                -349.12128548
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "t0": 0.716419257320759,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                399.79398998,
                -349.12128548
              ],
              "end": [
                391.4,
                -352.6625
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                391.4,
                -352.6625
              ],
              "end": [
                334.2,
                -370.4625
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                334.2,
                -370.4625
              ],
              "end": [
                277,
                -318.5625
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 0.28358074267924094,
              "visibility": "VISIBLE",
              "start": [
                277,
                -318.5625
              ],
              "end": [
                285.39398998,
                -315.02128548
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "t0": 0.28358074267924094,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                285.39398998,
                -315.02128548
              ],
              "end": [
                306.6,
                -306.075
              ]
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.17433060711931136,
              "visibility": "INTERNAL_SEAM",
              "start": [
                333.8,
                -329.45
              ],
              "end": [
                338.54179251,
                -321.37413463
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0.17433060711931136,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                338.54179251,
                -321.37413463
              ],
              "end": [
                361,
                -283.125
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.9999999999921573,
              "visibility": "INTERNAL_SEAM",
              "start": [
                361,
                -283.125
              ],
              "end": [
                391,
                -346.5
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                391,
                -346.5
              ],
              "end": [
                361,
                -283.125
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.9999999999958352,
              "visibility": "INTERNAL_SEAM",
              "start": [
                418.2,
                -300.175
              ],
              "end": [
                391,
                -346.5
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                391,
                -346.5
              ],
              "end": [
                475.4,
                -317.225
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                391,
                -346.5
              ],
              "end": [
                418.2,
                -300.175
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                475.4,
                -317.225
              ],
              "end": [
                391,
                -346.5
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.8256693928801712,
              "visibility": "INTERNAL_SEAM",
              "start": [
                361,
                -283.125
              ],
              "end": [
                338.54179251,
                -321.37413463
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "t0": 0.8256693928801712,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                338.54179251,
                -321.37413463
              ],
              "end": [
                333.8,
                -329.45
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                306.6,
                -306.075
              ],
              "end": [
                333.8,
                -329.45
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.9999999999983137,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                333.8,
                -329.45
              ],
              "end": [
                391,
                -346.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.08638922053245222,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                391,
                -346.5
              ],
              "end": [
                395.94146341,
                -347.97293621
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 1,
              "t0": 0.08638922053245222,
              "t1": 0.1537410836186069,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                395.94146341,
                -347.97293621
              ],
              "end": [
                399.79398998,
                -349.12128548
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 1,
              "t0": 0.1537410836186069,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                399.79398998,
                -349.12128548
              ],
              "end": [
                448.2,
                -363.55
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.49681902269548356,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                237.6,
                -300.775
              ],
              "end": [
                285.39398998,
                -315.02128548
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 0,
              "t0": 0.49681902269548356,
              "t1": 0.9777394655423003,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                285.39398998,
                -315.02128548
              ],
              "end": [
                331.65853659,
                -328.81167917
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 0,
              "t0": 0.9777394655423003,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                331.65853659,
                -328.81167917
              ],
              "end": [
                333.8,
                -329.45
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                333.8,
                -329.45
              ],
              "end": [
                306.6,
                -306.075
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                391,
                -346.5
              ],
              "end": [
                421,
                -340.175
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.43808630393652614,
              "visibility": "INTERNAL_SEAM",
              "start": [
                421,
                -340.175
              ],
              "end": [
                395.94146341,
                -347.97293621
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "t0": 0.43808630393652614,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                395.94146341,
                -347.97293621
              ],
              "end": [
                363.8,
                -357.975
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.5619136960603347,
              "visibility": "INTERNAL_SEAM",
              "start": [
                363.8,
                -357.975
              ],
              "end": [
                395.94146341,
                -347.97293621
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "t0": 0.5619136960603347,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                395.94146341,
                -347.97293621
              ],
              "end": [
                421,
                -340.175
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.3784572572726901,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                306.6,
                -306.075
              ],
              "end": [
                338.54179251,
                -321.37413463
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "t0": 0.3784572572726901,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                338.54179251,
                -321.37413463
              ],
              "end": [
                391,
                -346.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                391,
                -346.5
              ],
              "end": [
                363.8,
                -357.975
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.5619136960634739,
              "visibility": "INTERNAL_SEAM",
              "start": [
                363.8,
                -357.975
              ],
              "end": [
                331.65853659,
                -328.81167917
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "t0": 0.5619136960634739,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                331.65853659,
                -328.81167917
              ],
              "end": [
                306.6,
                -306.075
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 0.4380863039365263,
              "visibility": "INTERNAL_SEAM",
              "start": [
                306.6,
                -306.075
              ],
              "end": [
                331.65853659,
                -328.81167917
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "t0": 0.4380863039365263,
              "t1": 1,
              "visibility": "INTERNAL_SEAM",
              "start": [
                331.65853659,
                -328.81167917
              ],
              "end": [
                363.8,
                -357.975
              ],
              "reason": "Adjacent coplanar faces: shared non-roof-outline seam"
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                363.8,
                -357.975
              ],
              "end": [
                334.2,
                -370.4625
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ]
        }
      }
    },
    {
      "ownerId": "home-a",
      "roofId": "roof-home-a",
      "ownerGeometryKey": "{\"id\":\"home-a\",\"rotationDeg\":0,\"polygon\":[[94.5,5],[128,5],[128,31.25],[94.5,31.25]]}",
      "surfaceFacesKey": "[[\"home-a-roof-zone-1-side-neg-1\",[[128,5,20],[128,18.125,26.5625],[94.5,18.125,26.5625],[94.5,5,20]]],[\"home-a-roof-zone-1-side-pos-2\",[[128,18.125,26.5625],[128,31.25,20],[94.5,31.25,20],[94.5,18.125,26.5625]]]]",
      "views": {
        "north": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -128,
                20
              ],
              "end": [
                -128,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -128,
                26.5625
              ],
              "end": [
                -94.5,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                26.5625
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -128,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -128,
                26.5625
              ],
              "end": [
                -128,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -128,
                20
              ],
              "end": [
                -94.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -94.5,
                26.5625
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -94.5,
                26.5625
              ],
              "end": [
                -128,
                26.5625
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "south": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                128,
                20
              ],
              "end": [
                128,
                26.5625
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                128,
                26.5625
              ],
              "end": [
                94.5,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                26.5625
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                20
              ],
              "end": [
                128,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                128,
                26.5625
              ],
              "end": [
                128,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                128,
                20
              ],
              "end": [
                94.5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                20
              ],
              "end": [
                94.5,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                94.5,
                26.5625
              ],
              "end": [
                128,
                26.5625
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "east": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                20
              ],
              "end": [
                -18.125,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -18.125,
                26.5625
              ],
              "end": [
                -5,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -18.125,
                26.5625
              ],
              "end": [
                -31.25,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -18.125,
                26.5625
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-a-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  -18.125,
                  26.5625
                ],
                "sourceA": [
                  128,
                  18.125,
                  26.5625
                ],
                "sourceB": [
                  94.5,
                  18.125,
                  26.5625
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  -5,
                  20
                ],
                "sourceA": [
                  94.5,
                  5,
                  20
                ],
                "sourceB": [
                  128,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  -31.25,
                  20
                ],
                "sourceA": [
                  128,
                  31.25,
                  20
                ],
                "sourceB": [
                  94.5,
                  31.25,
                  20
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  -18.125,
                  26.5625
                ],
                "sourceA": [
                  94.5,
                  18.125,
                  26.5625
                ],
                "sourceB": [
                  128,
                  18.125,
                  26.5625
                ]
              }
            ]
          }
        },
        "west": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                20
              ],
              "end": [
                18.125,
                26.5625
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                18.125,
                26.5625
              ],
              "end": [
                5,
                20
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                18.125,
                26.5625
              ],
              "end": [
                31.25,
                20
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                20
              ],
              "end": [
                18.125,
                26.5625
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "home-a-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  18.125,
                  26.5625
                ],
                "sourceA": [
                  128,
                  18.125,
                  26.5625
                ],
                "sourceB": [
                  94.5,
                  18.125,
                  26.5625
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  5,
                  20
                ],
                "sourceA": [
                  94.5,
                  5,
                  20
                ],
                "sourceB": [
                  128,
                  5,
                  20
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  31.25,
                  20
                ],
                "sourceA": [
                  128,
                  31.25,
                  20
                ],
                "sourceB": [
                  94.5,
                  31.25,
                  20
                ]
              },
              {
                "faceId": "home-a-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  18.125,
                  26.5625
                ],
                "sourceA": [
                  94.5,
                  18.125,
                  26.5625
                ],
                "sourceB": [
                  128,
                  18.125,
                  26.5625
                ]
              }
            ]
          }
        },
        "pondy-iso-01": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 7,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                649.6,
                -369.15
              ],
              "end": [
                607.6,
                -440.68125
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                607.6,
                -440.68125
              ],
              "end": [
                433.4,
                -388.75625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.28048048048048013,
              "visibility": "VISIBLE",
              "start": [
                433.4,
                -388.75625
              ],
              "end": [
                445.18018018,
                -368.69313063
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0.28048048048048013,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                445.18018018,
                -368.69313063
              ],
              "end": [
                475.4,
                -317.225
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                475.4,
                -317.225
              ],
              "end": [
                649.6,
                -369.15
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                607.6,
                -440.68125
              ],
              "end": [
                565.6,
                -404.5875
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.6912733629151541,
              "visibility": "HIDDEN",
              "start": [
                565.6,
                -404.5875
              ],
              "end": [
                445.18018018,
                -368.69313063
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0.6912733629151541,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                445.18018018,
                -368.69313063
              ],
              "end": [
                391.4,
                -352.6625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                391.4,
                -352.6625
              ],
              "end": [
                433.4,
                -388.75625
              ]
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                433.4,
                -388.75625
              ],
              "end": [
                607.6,
                -440.68125
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ]
        }
      }
    },
    {
      "ownerId": "garage-b",
      "roofId": "roof-garage-b",
      "ownerGeometryKey": "{\"id\":\"garage-b\",\"rotationDeg\":0,\"polygon\":[[5,5],[27,5],[27,27],[5,27]]}",
      "surfaceFacesKey": "[[\"garage-b-roof-zone-1-side-neg-1\",[[27,5,11],[27,16,16.5],[5,16,16.5],[5,5,11]]],[\"garage-b-roof-zone-1-side-pos-2\",[[27,16,16.5],[27,27,11],[5,27,11],[5,16,16.5]]]]",
      "views": {
        "north": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                11
              ],
              "end": [
                -27,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -5,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                11
              ],
              "end": [
                -27,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -27,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                11
              ],
              "end": [
                -5,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -5,
                11
              ],
              "end": [
                -5,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -27,
                16.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "south": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                27,
                11
              ],
              "end": [
                27,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                16.5
              ],
              "end": [
                5,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                11
              ],
              "end": [
                27,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                27,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                11
              ],
              "end": [
                5,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                5,
                11
              ],
              "end": [
                5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                5,
                16.5
              ],
              "end": [
                27,
                16.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "east": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                11
              ],
              "end": [
                -16,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -16,
                16.5
              ],
              "end": [
                -5,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -16,
                16.5
              ],
              "end": [
                -27,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                11
              ],
              "end": [
                -16,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "garage-b-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  -16,
                  16.5
                ],
                "sourceA": [
                  27,
                  16,
                  16.5
                ],
                "sourceB": [
                  5,
                  16,
                  16.5
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  -5,
                  11
                ],
                "sourceA": [
                  5,
                  5,
                  11
                ],
                "sourceB": [
                  27,
                  5,
                  11
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  -27,
                  11
                ],
                "sourceA": [
                  27,
                  27,
                  11
                ],
                "sourceB": [
                  5,
                  27,
                  11
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  -16,
                  16.5
                ],
                "sourceA": [
                  5,
                  16,
                  16.5
                ],
                "sourceB": [
                  27,
                  16,
                  16.5
                ]
              }
            ]
          }
        },
        "west": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                11
              ],
              "end": [
                16,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                16,
                16.5
              ],
              "end": [
                5,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                16,
                16.5
              ],
              "end": [
                27,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                11
              ],
              "end": [
                16,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "garage-b-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  16,
                  16.5
                ],
                "sourceA": [
                  27,
                  16,
                  16.5
                ],
                "sourceB": [
                  5,
                  16,
                  16.5
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  5,
                  11
                ],
                "sourceA": [
                  5,
                  5,
                  11
                ],
                "sourceB": [
                  27,
                  5,
                  11
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  27,
                  11
                ],
                "sourceA": [
                  27,
                  27,
                  11
                ],
                "sourceB": [
                  5,
                  27,
                  11
                ]
              },
              {
                "faceId": "garage-b-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  16,
                  16.5
                ],
                "sourceA": [
                  5,
                  16,
                  16.5
                ],
                "sourceB": [
                  27,
                  16,
                  16.5
                ]
              }
            ]
          }
        },
        "pondy-iso-01": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 7,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                124.4,
                -138.8
              ],
              "end": [
                89.2,
                -198.75
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                89.2,
                -198.75
              ],
              "end": [
                -25.2,
                -164.65
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.2804804804804804,
              "visibility": "VISIBLE",
              "start": [
                -25.2,
                -164.65
              ],
              "end": [
                -15.32708709,
                -147.8351952
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0.2804804804804804,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -15.32708709,
                -147.8351952
              ],
              "end": [
                10,
                -104.7
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                10,
                -104.7
              ],
              "end": [
                124.4,
                -138.8
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                89.2,
                -198.75
              ],
              "end": [
                54,
                -168.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.606006006006006,
              "visibility": "HIDDEN",
              "start": [
                54,
                -168.5
              ],
              "end": [
                -15.32708709,
                -147.8351952
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0.606006006006006,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -15.32708709,
                -147.8351952
              ],
              "end": [
                -60.4,
                -134.4
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -60.4,
                -134.4
              ],
              "end": [
                -25.2,
                -164.65
              ]
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -25.2,
                -164.65
              ],
              "end": [
                89.2,
                -198.75
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ]
        }
      }
    },
    {
      "ownerId": "garage-a",
      "roofId": "roof-garage-a",
      "ownerGeometryKey": "{\"id\":\"garage-a\",\"rotationDeg\":0,\"polygon\":[[5,29],[27,29],[27,51],[5,51]]}",
      "surfaceFacesKey": "[[\"garage-a-roof-zone-1-side-neg-1\",[[27,29,11],[27,40,16.5],[5,40,16.5],[5,29,11]]],[\"garage-a-roof-zone-1-side-pos-2\",[[27,40,16.5],[27,51,11],[5,51,11],[5,40,16.5]]]]",
      "views": {
        "north": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                11
              ],
              "end": [
                -27,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -5,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -5,
                11
              ],
              "end": [
                -27,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -27,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                11
              ],
              "end": [
                -5,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -5,
                11
              ],
              "end": [
                -5,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -27,
                16.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "south": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 4,
            "hidden": 3,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                27,
                11
              ],
              "end": [
                27,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                16.5
              ],
              "end": [
                5,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                5,
                11
              ],
              "end": [
                27,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                27,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                11
              ],
              "end": [
                5,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                5,
                11
              ],
              "end": [
                5,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                5,
                16.5
              ],
              "end": [
                27,
                16.5
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": []
          }
        },
        "east": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -29,
                11
              ],
              "end": [
                -40,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -40,
                16.5
              ],
              "end": [
                -29,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -40,
                16.5
              ],
              "end": [
                -51,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                -51,
                11
              ],
              "end": [
                -40,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "garage-a-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  -40,
                  16.5
                ],
                "sourceA": [
                  27,
                  40,
                  16.5
                ],
                "sourceB": [
                  5,
                  40,
                  16.5
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  -29,
                  11
                ],
                "sourceA": [
                  5,
                  29,
                  11
                ],
                "sourceB": [
                  27,
                  29,
                  11
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  -51,
                  11
                ],
                "sourceA": [
                  27,
                  51,
                  11
                ],
                "sourceB": [
                  5,
                  51,
                  11
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  -40,
                  16.5
                ],
                "sourceA": [
                  5,
                  40,
                  16.5
                ],
                "sourceB": [
                  27,
                  40,
                  16.5
                ]
              }
            ]
          }
        },
        "west": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 2,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                29,
                11
              ],
              "end": [
                40,
                16.5
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                40,
                16.5
              ],
              "end": [
                29,
                11
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                40,
                16.5
              ],
              "end": [
                51,
                11
              ],
              "reason": "A source surface lies strictly in front along the exact cardinal ray"
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                51,
                11
              ],
              "end": [
                40,
                16.5
              ],
              "reason": "Nearest source edge on the analytic cardinal ray"
            }
          ],
          "suppressedSegments": [],
          "projectionProof": {
            "method": "CARDINAL_RAY_DEPTH_V1",
            "collapsedProjection": [
              {
                "faceId": "garage-a-roof-zone-1-side-neg-1",
                "edgeIndex": 1,
                "point": [
                  40,
                  16.5
                ],
                "sourceA": [
                  27,
                  40,
                  16.5
                ],
                "sourceB": [
                  5,
                  40,
                  16.5
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-neg-1",
                "edgeIndex": 3,
                "point": [
                  29,
                  11
                ],
                "sourceA": [
                  5,
                  29,
                  11
                ],
                "sourceB": [
                  27,
                  29,
                  11
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-pos-2",
                "edgeIndex": 1,
                "point": [
                  51,
                  11
                ],
                "sourceA": [
                  27,
                  51,
                  11
                ],
                "sourceB": [
                  5,
                  51,
                  11
                ]
              },
              {
                "faceId": "garage-a-roof-zone-1-side-pos-2",
                "edgeIndex": 3,
                "point": [
                  40,
                  16.5
                ],
                "sourceA": [
                  5,
                  40,
                  16.5
                ],
                "sourceB": [
                  27,
                  40,
                  16.5
                ]
              }
            ]
          }
        },
        "pondy-iso-01": {
          "status": "INTERVAL_VERIFIED",
          "counts": {
            "visible": 7,
            "hidden": 2,
            "unresolved": 0,
            "internalSeams": 0,
            "duplicateShared": 1,
            "edgeOnFaces": 0,
            "collapsedEdges": 0
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                47.6,
                -171.2
              ],
              "end": [
                12.4,
                -231.15
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                12.4,
                -231.15
              ],
              "end": [
                -102,
                -197.05
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 0.28048048048048013,
              "visibility": "VISIBLE",
              "start": [
                -102,
                -197.05
              ],
              "end": [
                -92.12708709,
                -180.2351952
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "t0": 0.28048048048048013,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -92.12708709,
                -180.2351952
              ],
              "end": [
                -66.8,
                -137.1
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -66.8,
                -137.1
              ],
              "end": [
                47.6,
                -171.2
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "t0": 0,
              "t1": 1,
              "visibility": "HIDDEN",
              "start": [
                12.4,
                -231.15
              ],
              "end": [
                -22.8,
                -200.9
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0,
              "t1": 0.606006006006006,
              "visibility": "HIDDEN",
              "start": [
                -22.8,
                -200.9
              ],
              "end": [
                -92.12708709,
                -180.2351952
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "t0": 0.606006006006006,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -92.12708709,
                -180.2351952
              ],
              "end": [
                -137.2,
                -166.8
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "t0": 0,
              "t1": 1,
              "visibility": "VISIBLE",
              "start": [
                -137.2,
                -166.8
              ],
              "end": [
                -102,
                -197.05
              ]
            }
          ],
          "suppressedSegments": [
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 3,
              "t0": 0,
              "t1": 1,
              "visibility": "DUPLICATE_SHARED",
              "start": [
                -102,
                -197.05
              ],
              "end": [
                12.4,
                -231.15
              ],
              "reason": "Same physical edge already emitted by neighboring face"
            }
          ]
        }
      }
    }
  ]
};
const api={manifest,matchingOwner};
function matchingOwner(roof,owner){if(!roof||!owner||!Array.isArray(roof.surfaceFaces)||roof.surfaceFaces.some(f=>!f||typeof f.id!=="string"||!Array.isArray(f.polygon))||roof.ownerId!==owner.ownerId||roof.ownerGeometryKey!==owner.ownerGeometryKey)return false;return JSON.stringify(roof.surfaceFaces.map(f=>[f.id,f.polygon]))===owner.surfaceFacesKey;}
if(typeof module!=='undefined'&&module.exports)module.exports=api;
global.Lot2Design4RoofIntervals=api;
})(typeof window!=='undefined'?window:globalThis);
