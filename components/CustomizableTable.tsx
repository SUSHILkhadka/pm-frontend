import SearchIcon from "@rsuite/icons/Search";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckPicker,
  Dropdown,
  Input,
  InputGroup,
  Pagination,
  Popover,
  Table,
  TagPicker,
  Whisper
} from "rsuite";
import { ValueType } from "rsuite/esm/Checkbox";
const amountOfData = 200;
const { Column, HeaderCell, Cell } = Table;

interface CustomizableTableProps {
  originalData: any;
  defaultSelectedColumns: any;
  defaultSelectedFilter: any;
  defaultFilterValues: any;
  columnNameJSON: any;
  getAllColumns: any;
  getTagPickerDataForColumns: any;
}

const CustomizableTable: React.FC<CustomizableTableProps> = (
  props: CustomizableTableProps
) => {
  const {
    originalData,
    defaultSelectedColumns,
    defaultSelectedFilter,
    defaultFilterValues,
    columnNameJSON,
    getTagPickerDataForColumns,
    getAllColumns
  } = props;
  const [selectedColumns, setSelectedColumns] = useState<any>(
    defaultSelectedColumns
  );

  const [selectedFilter, setSelectedFilter] = useState<any>(
    defaultSelectedFilter
  );

  const [filterValues, setFilterValues] = useState<any>(defaultFilterValues);

  const [nameMatchedData, setNameMatchedData] = useState<any>(originalData);
  const [filteredData, setFilteredData] = useState<any>(originalData);

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const handleCheckBoxChange = (
    value: ValueType | undefined,
    checked: boolean,
    event: any
  ) => {
    console.log(value, checked);
    setSelectedColumns({ ...selectedColumns, [value as string]: checked });
  };

  const [isColumnDropDownOpen, setColumnDropDownOpen] =
    useState<boolean>(false);
  const [isResetPressed, setResetPressed] = useState<boolean>(false);

  const renderIconButton = (props: any, ref: any) => {
    return (
      <button className="border-icon" color="white" {...props}>
        <svg
          color={isColumnDropDownOpen ? "#29b6f6" : ""}
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
        </svg>
      </button>
    );
  };

  const renderAddFilterButton = (props: any, ref: any) => {
    return (
      <button className="bg-white" ref={ref} {...props}>
        <span className="plus-icon">
          <svg
            stroke="currentColor"
            fill="none"
            color="#29b6f6"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </span>
        <span className="dropdown-button__label mr-2x">More filter</span>
      </button>
    );
  };

  const ColumsDropDown = (props: any) => (
    <>
      <Dropdown
        renderToggle={renderIconButton}
        open={isColumnDropDownOpen}
        onOpen={() => setColumnDropDownOpen(true)}
        onClose={() => setColumnDropDownOpen(false)}
        {...props}
      >
        {Object.keys(defaultSelectedColumns).map((value: string) => {
          return (
            <Checkbox
              key={value}
              value={value}
              style={{ width: 150 }}
              className="width-100p"
              checked={selectedColumns[value]}
              onChange={handleCheckBoxChange}
            >
              {" "}
              {columnNameJSON[value]}
            </Checkbox>
          );
        })}
      </Dropdown>
    </>
  );

  const FilterDropDown = (props: any) => (
    <Dropdown renderToggle={renderAddFilterButton} {...props}>
      {Object.keys(selectedFilter)
        .filter((value) => selectedFilter[value] != true)
        .map((value: string) => {
          const handleFilterClick = () => {
            setSelectedFilter({ ...selectedFilter, [value]: true });
          };
          return (
            <Button
              className="primary width-100p"
              key={value}
              onClick={handleFilterClick}
            >
              {columnNameJSON[value]}
            </Button>
          );
        })}
    </Dropdown>
  );

  useEffect(() => {
    console.log("nameMatched data = ", nameMatchedData);
    handleApplyFilter();
    sortData();
  }, [nameMatchedData, sortColumn, sortType, isResetPressed]);

  const [searchString, setSearchString] = useState<any>("");

  const handleProjectSearch = async () => {
    console.log("in search ", searchString);
    const isMatch = (name1: string, name2: string) => {
      if (name1 == "" || name2 == "") {
        return true;
      }
      if (name1 === name2) {
        return true;
      }
      return false;
    };
    console.log(searchString);
    let tempData: any = [];
    for (const i of originalData) {
      if (isMatch(i["projectName"], searchString)) {
        tempData.push(i);
      }
    }
    setNameMatchedData(tempData);
    setPage(1);
  };

  const handleApplyFilter = () => {
    console.log("in filter");
    let tempData: any = [...nameMatchedData];
    Object.keys(filterValues)
      .filter((value) => filterValues[value].length > 0)
      .map((value: any) => {
        const filteringCriteria = filterValues[value];
        let f = [];
        for (const i of tempData) {
          var shouldDelete = true;
          for (const j of filteringCriteria) {
            console.log("in i j", i[value], j);
            if (i[value] == j) {
              shouldDelete = false;
              break;
            }
          }
          if (!shouldDelete) {
            f.push(i);
          }
        }
        tempData = [...f];
      });

    setFilteredData(tempData);
    setPage(1);
  };

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const sortData = () => {
    if (sortColumn && sortType) {
      let tempData = [...filteredData];
      console.log("in sort here", sortColumn);

      setFilteredData(
        tempData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];

          if (sortColumn == "projectTimeline") {
            console.log("in projectTimeline sort here", sortColumn);
            x = x.start;
            y = y.start;
          }
          if (typeof x === "string") {
            x = x.toLowerCase();
          }
          if (typeof y === "string") {
            y = y.toLowerCase();
          }
          if (sortType === "asc") {
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          } else {
            if (x < y) return 1;
            if (x > y) return -1;
            return 0;
          }
        })
      );
    }
  };

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const paginatedData = filteredData.filter((v: any, i: any) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const CustomLimitDropDown = () => {
    const limitArray = [10, 20, 30, 40];
    const handleSelect = (value: any) => {
      console.log(value);
      setLimit(value);
      setPage(1);
    };
    return (
      <select
        defaultValue={limit}
        className="lf-table__pagination-dropdown"
        onChange={(value) => {
          console.log("value = ", value.target.value);
          handleSelect(value.target.value);
        }}
      >
        {limitArray.map((value) => {
          return (
            <option
              key={value.toString()}
              className="lf-table__pagination-dropdown-option "
              value={value}
            >
              Show {value}
            </option>
          );
        })}
      </select>
    );
  };
  return (
    <div className="center flex">
      <div className="center-80">
        <div className="lf-table__head-row flex">
          <div>
            <div className="projectname">Projects</div>
            <div className="projectcount">
              Showing {limit} of {filteredData.length} Projects
            </div>
          </div>
          <ColumsDropDown className="justify-right" size="sm" />
        </div>

        <div className="table__header">
          <div className="flex justify-right ">
            <div className="flex align-center justify-space-between width-60p ">
              <InputGroup
                className="searchbar"
                style={{ width: "50%", minWidth: 40 }}
              >
                <InputGroup.Addon style={{ backgroundColor: "white" }}>
                  <SearchIcon />
                </InputGroup.Addon>
                <Input
                  onPressEnter={handleProjectSearch}
                  id="searchinput"
                  placeholder="Search by project name"
                  value={searchString}
                  onChange={setSearchString}
                />
              </InputGroup>
              <FilterDropDown title="+ More Filter" size="sm" />

              <div>
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    console.log("data", filterValues);
                    handleApplyFilter();
                  }}
                >
                  Apply filter
                </button>

                <button
                  className="dropdown-button__label mr-1x"
                  onClick={() => {
                    setSelectedFilter(defaultSelectedFilter);
                    setFilterValues(defaultFilterValues);
                    setResetPressed(!isResetPressed);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            {Object.keys(selectedFilter)
              .filter((value) => selectedFilter[value] != false)
              .map((value) => {
                const data = getTagPickerDataForColumns(value);

                const handleFilterChange = (selections: any) => {
                  setFilterValues({ ...filterValues, [value]: selections });
                };
                const handleRemoveFilter = () => {
                  setFilterValues({ ...filterValues, [value]: [] });
                  setSelectedFilter({ ...selectedFilter, [value]: false });
                };
                return (
                  <div key={value} className="flex filter-input-container">
                    <div className="flex flex-column filter-input">
                      <div> {columnNameJSON[value]}</div>
                      {/* <TagPicker
                        searchable
                        onChange={handleFilterChange}
                        data={data}
                        className="filter-input-tagpicker"
                      ></TagPicker> */}
                      <CheckPicker
                        sticky={true}
                        id="checkbox"
                        searchable={true}
                        cleanable={true}
                        onChange={handleFilterChange}
                        data={data}
                        style={{ width: 100 }}
                        className="filter-input-tagpicker"
                      />
                    </div>
                    <button onClick={handleRemoveFilter}>
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        <Table
          // height={600}
          autoHeight={true}
          className="tableClass"
          data={paginatedData}
          id="vyagutaTable"
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          bordered={true}
          headerHeight={50}
        >
          {Object.keys(selectedColumns)
            .filter((value) => selectedColumns[value] == true)
            .map((value) => {
              console.log("value == ", value);
              return getAllColumns(value, columnNameJSON, sortColumn);
            })}
        </Table>

        <div className="table__pagination ">
          <Button
            className={
              `${page == 1 ? "lf-table__pagination-btn--active" : ""} ` +
              "lf-table__pagination-btn"
            }
            onClick={() => setPage(1)}
          >
            First
          </Button>
          <Button
            className={
              `${page == 1 ? "lf-table__pagination-btn--disabled" : ""} ` +
              "lf-table__pagination-btn "
            }
            disabled={page == 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          <Button
            className={
              `${
                page == Math.ceil(filteredData.length / limit)
                  ? "lf-table__pagination-btn--disabled"
                  : ""
              } ` + "lf-table__pagination-btn "
            }
            disabled={page == Math.ceil(filteredData.length / limit)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
          <Button
            className={
              `${
                page == Math.ceil(filteredData.length / limit)
                  ? "lf-table__pagination-btn--active"
                  : ""
              } ` + "lf-table__pagination-btn "
            }
            onClick={() => {
              const numberOfPages = Math.ceil(filteredData.length / limit);
              setPage(numberOfPages);
            }}
          >
            Last
          </Button>

          <CustomLimitDropDown />
          <span className="lf-table__pagination-status">
            Page{" "}
            <strong>
              {page} of {Math.ceil(filteredData.length / limit)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomizableTable;
