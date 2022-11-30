import React, { useEffect, useState } from "react";
import { getStudentsList } from "../services/auth.service";
import { deleteStudent } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import jspdf from "jspdf";
import Chart from 'react-apexcharts';
import _ from "lodash";
import 'jspdf-autotable';

// paginate 1
const pageSize =2;
// paginate 2 end

export default function Dashboard() {

  // paginate 2
  const [paginatedArray, setpaginatedArray] = useState([]);
  const [currentPage,setcurrentPage]=useState(1)
  // paginate 2 end

  //piechart
  const [studentName, setStudentname] = useState([]);
  const [studentPercentage, setStudentpercentage] = useState([]);

  const sName = [];
  const sPercentage = [];
  ////////

  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  // get student list
  useEffect(() => {
    const test = async (e) => {
      const response = await getStudentsList();
      console.log(response)
      setArray(response.data.result);

      // pagiante 3
      setpaginatedArray(_(response.data.result).slice(0).take(pageSize).value());
      // pagiantion 3 end

      //pie chart
      for (let i = 0; i < response.data.result.length; i++) {
        sName.push(response.data.result[i].studentName)
        sPercentage.push(parseInt(response.data.result[i].avgPercentage))
      }
      setStudentname(sName);
      setStudentpercentage(sPercentage);
      console.log(sPercentage)
      ////////

    };
    test();
  }, []);
  console.log(array)

  // to delete
  const deleteHandler = async (data) => {
    const response = await deleteStudent(data._id);
    console.log(response.data.message);

    if (response.data.status) {
      const response = await getStudentsList();
      setArray(response.data.result);
    }
  };

  // to redirect to edit page
  const editHandler = async (data) => {
    console.log(data);
    navigate(`/editform/${data._id}`);
  };

  // to redirect to add student page
  const addStudentHandler = () => {
    navigate("/addstudent");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // pdf downloader 
  const pdfhandel = (data) => {
    var doc = new jspdf('landscape', 'px', 'a4', 'false');
    // let image=`localhost:8080/uploads/${data.image}`
    // doc.addImage(image,'jpge',65,25,400,300)
    // doc.addPage()
    doc.setFont('Helvertica', 'bold')
    doc.text(60, 60, `Fullname:${data.studentName}`)
    doc.text(60, 80, `Class:${data.class}`)
    doc.text(60, 100, `Email:${data.email}`)
    doc.text(60, 120, `FrontEnd:${data.frontEnd}`)
    doc.text(60, 140, `BackEnd:${data.backEnd}`)
    doc.text(60, 160, `AvgPercentage:${data.avgPercentage}`)
    doc.text(60, 180, `Grade:${data.grade}`)
    doc.save(`${data.studentName}.pdf`)
  }
  ////////

  //  all data download in pdf
  const downloadHandler=()=>{
    const doc = new  jspdf();

    doc.text("All Data List",20,10);

    doc.autoTable({
      columns:[
        {header:"Full Name",dataKey:"studentName"},
        // {header:"Class",dataKey:"class"},
        {header:"Email",dataKey:"email"},
        {header:"FrondEnd",dataKey:"frontEnd"},
        {header:"BackEnd",dataKey:"backEnd"},
        {header:"AvgPercentage",dataKey:"avgPercentage"},
        {header:"Grade",dataKey:"grade"},
      
      ],
      body:array
    })
    doc.save("table");
  }

  //// all doc pdf end

  // pagiantion 4
  const pageCount = array? Math.ceil(array.length/pageSize) :0;
  if (pageCount ===1) return null;
  const pages = _.range(1,pageCount+1)

  const pagination=(pageNo)=>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize; 
    const newArray = _(array).slice(startIndex).take(pageSize).value();
    setpaginatedArray(newArray)
  }
  console.log(paginatedArray)
  // pagiantion 4 end

  return (
    <div>

      <div className="text-center">
       <button class="btn btn-info" onClick={downloadHandler}>Download all Data</button>
      </div><br/>

    <form type="submit" onSubmit={(e) => handleSubmit(e)}>

       <div className="text-end mt-2">
          <button
            type="button"
            class="btn btn-info">
            <Link class="nav-link active" to="/home">
              Back 👉
            </Link>
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>

      <div className="text-center md-4">
        <button
          type="button"
          class="btn btn-info"
          onClick={addStudentHandler}>
          Add Student
        </button>
        &nbsp; &nbsp;
      </div>

      <br />

      <table class="table table-borderless table-hover text-center">
        
        <thead>
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">Student Name</th>
            <th scope="col">Profile Pic</th>
            {/* <th scope="col">Class</th> */}
            <th scope="col">Email</th>
            <th scope="col">FE Mark</th>
            <th scope="col">BE Mark</th>
            <th scope="col">Avg Percent</th>
            <th scope="col">Grade</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* pagination 5 */}
          {paginatedArray.map((data, index) => {
          // pagiantion 5 end

            return (
              <tr> 
                <td>{index + 1}</td>
                <td>{data.studentName}</td>
                <td>
                  <img src={data.image}
                    width="100px" heigth="100px" />
                </td>
                {/* <td>{data.class}</td> */}
                <td>{data.email}</td>
                <td>{data.frontEnd}</td>
                <td>{data.backEnd}</td>
                <td>{data.avgPercentage}</td>
                <td>{data.grade}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={(e) => editHandler(data)}>
                    Edit
                  </button>{" "}

                  &nbsp;

                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={(e) => deleteHandler(data)}>
                    Delete
                  </button>

                  &nbsp;&nbsp;

                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={(e) => pdfhandel(data)}>
                    Pdf
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>

      </table>

{/* pagination 6 */}
      <nav className="d-flex justify-content-center">
  <ul className="pagination">
    {
      pages.map((page)=>(
        <li className={
          page === currentPage? "page-item active" : "page-item"
        }>
          <p className="page-link"
          onClick={()=>pagination(page)}
          >{page}</p></li>
      ))
    }
   
  </ul>
</nav>
{/* pagination 6 end */}

    </form>

    {/* charts start*/}
    <div>
        <Chart type="pie"
          width={1000}
          height={550}
          series={studentPercentage}

          options={{
            title: {
              text: "Marks"
            },
            labels: studentName
          }}
        ></Chart>
      </div>

      <div>
        <Chart type="bar"
          width={1000}
          height={550}
          series={
            [
              {
                name: "Percentage",
                data: studentPercentage
              }
            ]
          }
          options={{
            title: {
              text: "Developed by Roshni",
              style: { fontSize: 20 }
            },
            xaxis: {
              categories: studentName,
              title: {
                text: "Student Name",
                style: { fontSize: 14 }
              }
            },
            yaxis: {
              title: {
                text: "Student Percentage",
                style: { fontSize: 14 }
              }
            }
          }
          }>
          </Chart>
      </div>
{/* charts end */}

    </div>

  );
    }
