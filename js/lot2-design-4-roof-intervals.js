(function(global){
'use strict';
const manifest={
  "schemaVersion": "lotscope-verified-roof-intervals-v1",
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
    "elevationAxes": "CARDINAL_LEFT_RIGHT_REVIEW"
  },
  "owners": [
    {
      "ownerId": "home-b",
      "roofId": "roof-home-b",
      "ownerGeometryKey": "{\"id\":\"home-b\",\"rotationDeg\":0,\"polygon\":[[54,5],[94.5,5],[94.5,31.25],[72.5,31.25],[72.5,22],[54,22]]}",
      "surfaceFacesKey": "[[\"home-b-roof-zone-1-side-neg-1\",[[72.5,13.5,24.25],[72.5,5,20],[83.5,13.500000000066663,24.25000000003333]]],[\"home-b-roof-zone-1-side-neg-2\",[[83.49999999991373,13.5,24.25],[72.5,5,20],[83.5,5,20]]],[\"home-b-roof-zone-1-side-neg-3\",[[94.5,13.5,24.25],[83.5,13.5,24.25],[94.5,5,20]]],[\"home-b-roof-zone-1-side-neg-4\",[[83.50000000008627,13.5,24.25],[83.5,5,20],[94.5,5,20]]],[\"home-b-roof-zone-1-side-neg-5\",[[54,5,20],[72.5,5,20],[72.5,13.5,24.25],[54,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-6\",[[72.5,22,20],[72.5,13.5,24.25],[83.5,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-7\",[[94.5,22,20],[83.5,13.499999999933337,24.25000000003333],[94.5,13.5,24.25]]],[\"home-b-roof-zone-1-side-pos-8\",[[54,13.5,24.25],[72.5,13.5,24.25],[72.5,22,20],[54,22,20]]],[\"home-b-roof-zone-2-side-neg-9\",[[83.5,22,24.25000000003333],[83.5,13.5,24.25000000003333],[94.5,22,20]]],[\"home-b-roof-zone-2-side-neg-10\",[[83.5,31.25,24.25000000003333],[83.5,22,24.25000000003333],[94.5,22,20],[94.5,31.25,20]]],[\"home-b-roof-zone-2-side-pos-11\",[[72.5,22,20],[83.49999999991373,13.5,24.25],[83.5,22,24.25000000003333]]],[\"home-b-roof-zone-2-side-pos-12\",[[72.5,22,20],[83.5,22,24.25000000003333],[83.5,31.25,24.25000000003333],[72.5,31.25,20]]]]",
      "views": {
        "north": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 8,
            "hidden": 3,
            "unresolved": 10,
            "internalSeams": 10,
            "duplicateShared": 3,
            "edgeOnFaces": 4,
            "collapsedEdges": 6
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                24.25
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                20
              ],
              "end": [
                94.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                83.5,
                20
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 0,
              "visibility": "HIDDEN",
              "start": [
                54,
                20
              ],
              "end": [
                72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                24.25
              ],
              "end": [
                54,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                54,
                24.25
              ],
              "end": [
                54,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                72.5,
                20
              ],
              "end": [
                54,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                54,
                20
              ],
              "end": [
                54,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                94.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                72.5,
                20
              ],
              "end": [
                83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                83.5,
                24.25
              ],
              "end": [
                72.5,
                20
              ]
            }
          ]
        },
        "south": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 8,
            "hidden": 3,
            "unresolved": 10,
            "internalSeams": 10,
            "duplicateShared": 3,
            "edgeOnFaces": 4,
            "collapsedEdges": 6
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                24.25
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -94.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                -83.5,
                20
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                -54,
                20
              ],
              "end": [
                -72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -72.5,
                24.25
              ],
              "end": [
                -54,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                -54,
                24.25
              ],
              "end": [
                -54,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -54,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                -54,
                20
              ],
              "end": [
                -54,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-11",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -72.5,
                20
              ],
              "end": [
                -83.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -83.5,
                24.25
              ],
              "end": [
                -72.5,
                20
              ]
            }
          ]
        },
        "east": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 4,
            "hidden": 2,
            "unresolved": 16,
            "internalSeams": 4,
            "duplicateShared": 4,
            "edgeOnFaces": 8,
            "collapsedEdges": 10
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                -13.5,
                24.25
              ],
              "end": [
                -22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                -22,
                20
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                -22,
                24.25
              ],
              "end": [
                -13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                -31.25,
                24.25
              ],
              "end": [
                -22,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -22,
                20
              ],
              "end": [
                -31.25,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -31.25,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -31.25,
                24.25
              ],
              "end": [
                -31.25,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -22,
                20
              ]
            }
          ]
        },
        "west": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 4,
            "hidden": 2,
            "unresolved": 16,
            "internalSeams": 4,
            "duplicateShared": 4,
            "edgeOnFaces": 8,
            "collapsedEdges": 10
          },
          "segments": [
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-3",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-4",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-neg-5",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-6",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-7",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 1,
              "visibility": "UNRESOLVED",
              "start": [
                13.5,
                24.25
              ],
              "end": [
                22,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-1-side-pos-8",
              "edgeIndex": 3,
              "visibility": "UNRESOLVED",
              "start": [
                22,
                20
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-9",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                22,
                24.25
              ],
              "end": [
                13.5,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                24.25
              ],
              "end": [
                22,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                22,
                20
              ],
              "end": [
                31.25,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-neg-10",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                31.25,
                20
              ],
              "end": [
                31.25,
                24.25
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                24.25
              ],
              "end": [
                31.25,
                20
              ]
            },
            {
              "faceId": "home-b-roof-zone-2-side-pos-12",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                31.25,
                20
              ],
              "end": [
                22,
                20
              ]
            }
          ]
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
              "visibility": "HIDDEN",
              "start": [
                128,
                20
              ],
              "end": [
                128,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                128,
                26.5625
              ],
              "end": [
                94.5,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                26.5625
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                94.5,
                20
              ],
              "end": [
                128,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                128,
                26.5625
              ],
              "end": [
                128,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                128,
                20
              ],
              "end": [
                94.5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                94.5,
                20
              ],
              "end": [
                94.5,
                26.5625
              ]
            }
          ]
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
              "visibility": "VISIBLE",
              "start": [
                -128,
                20
              ],
              "end": [
                -128,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                -128,
                26.5625
              ],
              "end": [
                -94.5,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                26.5625
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -128,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "HIDDEN",
              "start": [
                -128,
                26.5625
              ],
              "end": [
                -128,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "HIDDEN",
              "start": [
                -128,
                20
              ],
              "end": [
                -94.5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -94.5,
                20
              ],
              "end": [
                -94.5,
                26.5625
              ]
            }
          ]
        },
        "east": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                20
              ],
              "end": [
                -18.125,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -18.125,
                26.5625
              ],
              "end": [
                -5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -18.125,
                26.5625
              ],
              "end": [
                -31.25,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -31.25,
                20
              ],
              "end": [
                -18.125,
                26.5625
              ]
            }
          ]
        },
        "west": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                20
              ],
              "end": [
                18.125,
                26.5625
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                18.125,
                26.5625
              ],
              "end": [
                5,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                18.125,
                26.5625
              ],
              "end": [
                31.25,
                20
              ]
            },
            {
              "faceId": "home-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                31.25,
                20
              ],
              "end": [
                18.125,
                26.5625
              ]
            }
          ]
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
              "visibility": "HIDDEN",
              "start": [
                27,
                11
              ],
              "end": [
                27,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                5,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                5,
                16.5
              ],
              "end": [
                5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                5,
                11
              ],
              "end": [
                27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                11
              ],
              "end": [
                5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                5,
                11
              ],
              "end": [
                5,
                16.5
              ]
            }
          ]
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
              "visibility": "VISIBLE",
              "start": [
                -27,
                11
              ],
              "end": [
                -27,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -5,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                -5,
                11
              ],
              "end": [
                -27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "HIDDEN",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                11
              ],
              "end": [
                -5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -5,
                11
              ],
              "end": [
                -5,
                16.5
              ]
            }
          ]
        },
        "east": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -5,
                11
              ],
              "end": [
                -16,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -16,
                16.5
              ],
              "end": [
                -5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -16,
                16.5
              ],
              "end": [
                -27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -27,
                11
              ],
              "end": [
                -16,
                16.5
              ]
            }
          ]
        },
        "west": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                5,
                11
              ],
              "end": [
                16,
                16.5
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                16,
                16.5
              ],
              "end": [
                5,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                16,
                16.5
              ],
              "end": [
                27,
                11
              ]
            },
            {
              "faceId": "garage-b-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                27,
                11
              ],
              "end": [
                16,
                16.5
              ]
            }
          ]
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
              "visibility": "HIDDEN",
              "start": [
                27,
                11
              ],
              "end": [
                27,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                5,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                5,
                16.5
              ],
              "end": [
                5,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "HIDDEN",
              "start": [
                5,
                11
              ],
              "end": [
                27,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "VISIBLE",
              "start": [
                27,
                16.5
              ],
              "end": [
                27,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                27,
                11
              ],
              "end": [
                5,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                5,
                11
              ],
              "end": [
                5,
                16.5
              ]
            }
          ]
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
              "visibility": "VISIBLE",
              "start": [
                -27,
                11
              ],
              "end": [
                -27,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 1,
              "visibility": "VISIBLE",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -5,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "VISIBLE",
              "start": [
                -5,
                16.5
              ],
              "end": [
                -5,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 3,
              "visibility": "VISIBLE",
              "start": [
                -5,
                11
              ],
              "end": [
                -27,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "HIDDEN",
              "start": [
                -27,
                16.5
              ],
              "end": [
                -27,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 1,
              "visibility": "HIDDEN",
              "start": [
                -27,
                11
              ],
              "end": [
                -5,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "HIDDEN",
              "start": [
                -5,
                11
              ],
              "end": [
                -5,
                16.5
              ]
            }
          ]
        },
        "east": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -29,
                11
              ],
              "end": [
                -40,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -40,
                16.5
              ],
              "end": [
                -29,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                -40,
                16.5
              ],
              "end": [
                -51,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                -51,
                11
              ],
              "end": [
                -40,
                16.5
              ]
            }
          ]
        },
        "west": {
          "status": "REVIEW_REQUIRED",
          "counts": {
            "visible": 0,
            "hidden": 0,
            "unresolved": 4,
            "internalSeams": 0,
            "duplicateShared": 0,
            "edgeOnFaces": 2,
            "collapsedEdges": 4
          },
          "segments": [
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                29,
                11
              ],
              "end": [
                40,
                16.5
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-neg-1",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                40,
                16.5
              ],
              "end": [
                29,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 0,
              "visibility": "UNRESOLVED",
              "start": [
                40,
                16.5
              ],
              "end": [
                51,
                11
              ]
            },
            {
              "faceId": "garage-a-roof-zone-1-side-pos-2",
              "edgeIndex": 2,
              "visibility": "UNRESOLVED",
              "start": [
                51,
                11
              ],
              "end": [
                40,
                16.5
              ]
            }
          ]
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
