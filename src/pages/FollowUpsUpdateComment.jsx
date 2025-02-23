import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agentVendorComments, fetchSupportFollowUpssList, updateAgentComment } from "../features/followUpsSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoadingAnimation from "../components/LoadingAnimation";
import VendorDetails from "./VendorDetails";
import { fetchVendorShowDetailData } from "../features/menuSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";


const FollowUpsUpdateComment = () => {
  const { agentVendorCommentsList, isLoading } = useSelector(
    (state) => state.followUps
  );

  const dispatch = useDispatch();
  const { id, companyId } = useParams();
  const [activeAgent, setActiveAgent] = useState({})
  const [comment, setComment] = useState("")
  const [title, setTitle] = useState("")

  console.log(activeAgent, "activeAgent activeAgent ");


  useEffect(() => {
    dispatch(agentVendorComments(id));
  }, [dispatch, id]);


  useEffect(() => {
    dispatch(fetchVendorShowDetailData(companyId));
  }, [dispatch, companyId]);

  useEffect(() => {
    if (agentVendorCommentsList?.length > 0) {
      setComment(activeAgent?.title || "");
      setComment(activeAgent?.comment || "");
      // setActiveAgent(agentVendorCommentsList[0])
    }
  }, [agentVendorCommentsList, activeAgent]);

  useEffect(() => {
    if (agentVendorCommentsList?.length > 0) {
      setActiveAgent(agentVendorCommentsList[0])
    }
  }, [agentVendorCommentsList]);

  const onHandleCommentSubmit = async (unid) => {
    const data = {
      id: unid,
      title,
      comment: comment
    }
    try {
      await dispatch(updateAgentComment(data))
      dispatch(agentVendorComments(id));
      await dispatch(fetchSupportFollowUpssList());
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="container-fluid my-5">
      <h1 className="mb-4">FollowUp Updates</h1>
      <hr />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        agentVendorCommentsList?.map((comment) => (
          <>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                mb: 2,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              style={{ border: comment?.id === activeAgent?.id ? '2px solid #6e84a3' : 'none' }}
            >
              <CardContent onClick={() => setActiveAgent(comment)} style={{ cursor: 'pointer' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" >
                    User Issue Raising Testing
                  </Typography>
                  <Chip
                    label={comment.admin_user_name}
                    color={"success"}
                    variant="outlined"
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  />
                </Stack>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {comment.comment}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(comment.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </>

        ))
      )}


      <VendorDetails searchBox={false} />


      <div className="mt-4">
        {agentVendorCommentsList?.length > 0 && (
          <>
            <div className="row ">
              <div className="col-lg-8 mx-auto">
                {/* Title Input */}
                <div className="col-md-12 mb-3">
                  {/* <FloatingLabel label="Title"> */}
                  <Form.Control
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    name="Enter title"
                    type="text"
                    placeholder="Enter title"
                  />
                  {/* </FloatingLabel> */}
                </div>

                {/* Comment Input */}
                <div className="col-md-12 mb-3">
                  <FloatingLabel label="Comment">
                    <Form.Control
                      value={comment || ""}
                      onChange={(e) => setComment(e.target.value)}
                      name="comment"
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    disabled={isLoading}
                    className="btn bg-success text-white"
                    onClick={() => onHandleCommentSubmit(activeAgent?.id)}
                  >
                    {isLoading ? 'Loading...' : "Update"}
                  </button>
                </div>
              </div>
            </div>


          </>
        )}
      </div>


    </div>
  );
};

export default FollowUpsUpdateComment;
